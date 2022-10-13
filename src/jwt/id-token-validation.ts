import { KEYUTIL, KJUR } from "jsrsasign-reduced";

import { config } from "../configuration/config.service";
import { assertProviderMetadata } from "../discovery/assert-provider-metadata";
import { discoveryState } from "../discovery/discovery-state";
import { LogUtil } from "../utils/log-util";
import { getNonce } from "../utils/nonce";
import { epochSeconds } from "../utils/time";
import { parseJwt } from "./parseJwt";
import { validateJwtString } from "./validateJwtString";

import type { IdTokenPayload } from "./model/id-token.model";
import type { JWTHeader } from "./model/jwt.model";

const supportedKeyAlgs = [
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "PS256",
  "PS384",
  "PS512",
];

function validSignature(idTokenString: string, headerData: JWTHeader): boolean {
  const jwks = discoveryState.jwks;
  if (!jwks || !jwks.keys) {
    LogUtil.error("JWKs not defined");
    return false;
  }

  if (!headerData.alg) {
    LogUtil.warn("ID Token has invalid JOSE Header");
    return false;
  }

  const kid = headerData.kid;
  const alg = headerData.alg;

  if (!supportedKeyAlgs.includes(alg as string)) {
    LogUtil.warn("alg not supported", alg);

    return false;
  }

  // No kid in the Jose header
  if (kid) {
    const keyToValidate = jwks.keys.find((key) => key.kid === kid);
    if (!keyToValidate) {
      LogUtil.warn("Didn't find key to validate");
      return false;
    }
    const publicKey = KEYUTIL.getKey(keyToValidate);
    const isValid = KJUR.jws.JWS.verify(idTokenString, publicKey, [alg]);
    if (!isValid) {
      LogUtil.warn("incorrect Signature, validation failed for id_token");
    }
    return isValid;
  } else {
    const jwtKtyToUse = alg.charAt(0) === "E" ? "EC" : "RSA";
    let keyToValidate;

    // If only one key, use it
    if (jwks.keys.length === 1 && jwks.keys[0].kty === jwtKtyToUse) {
      keyToValidate = jwks.keys[0];
    } else {
      // More than one key
      // Make sure there's exactly 1 key candidate
      // kty "RSA" and "EC" use "sig"
      const matchingKeys = jwks.keys.filter(
        (key) => key.kty === jwtKtyToUse && key.use === "sig",
      );

      if (matchingKeys.length > 1) {
        LogUtil.warn(
          "no ID Token kid claim in JOSE header and multiple supplied in jwks_uri",
        );
        return false;
      }
      keyToValidate = matchingKeys[0];
    }

    if (!keyToValidate) {
      LogUtil.warn(
        "no keys found, incorrect Signature, validation failed for id_token",
      );

      return false;
    }

    const isValid = KJUR.jws.JWS.verify(
      idTokenString,
      KEYUTIL.getKey(keyToValidate),
      [alg],
    );

    if (!isValid) {
      LogUtil.warn("incorrect Signature, validation failed for id_token");
    }

    return isValid;
  }
}

function hasClientIdAudience(idToken: IdTokenPayload) {
  return idToken.aud.includes(config.client_id);
}

function hasOnlyTrustedAudiences(idToken: IdTokenPayload) {
  if (typeof idToken.aud === "string") {
    return idToken.aud === config.client_id;
  }
  return idToken.aud.every((audience) => {
    if (idToken.aud === config.client_id) {
      return true;
    }
    return (config.trusted_audiences || []).includes(audience);
  });
}

function hasMultipleAudiences(idToken: IdTokenPayload) {
  return typeof idToken.aud !== "string" && idToken.aud.length > 1;
}

function hasAzpClaim(idToken: IdTokenPayload) {
  return typeof idToken.azp !== "undefined";
}

function azpClaimValid(idToken: IdTokenPayload) {
  return idToken.azp === config.client_id;
}

function tokenIsExpired(idToken: IdTokenPayload) {
  return epochSeconds() > idToken.exp;
}

function iatOffsetTooBig(idToken: IdTokenPayload) {
  const offset = Math.abs(epochSeconds() - idToken.iat);
  LogUtil.debug(
    "checking issued at offset (iat)",
    "iat",
    idToken.iat,
    "epoch current",
    epochSeconds(),
    "offset",
    offset,
  );
  return offset > (config.issuedAtMaxOffset || 30);
}

function nonceIsValid(idToken: IdTokenPayload) {
  return getNonce() === idToken.nonce;
}

/**
 * If any of the validation procedures fail, any operations requiring the
 * information that failed to correctly validate will be aborted and the
 * information that failed to validate will not be used.
 *
 * @param idTokenString the id token as JWT string
 */
export function validateIdToken(idTokenString: string): void {
  LogUtil.debug("Validating ID Token");
  assertProviderMetadata(discoveryState.providerMetadata);

  validateJwtString(idTokenString);
  const { header, payload: idTokenPayload } =
    parseJwt<IdTokenPayload>(idTokenString);

  if (!idTokenPayload.sub) {
    LogUtil.error("The ID Token does not have a sub claim");

    throw Error("id_token_invalid__no_sub");
  }
  if (!idTokenPayload.iat) {
    LogUtil.error("The ID Token does not have a iat claim");

    throw Error("id_token_invalid__no_iat");
  }

  // The Issuer Identifier for the OpenID Provider (which is typically obtained
  // during Discovery) MUST exactly match the value of the iss (issuer) Claim.
  if (idTokenPayload.iss !== discoveryState.providerMetadata.issuer) {
    LogUtil.error("Issuer of ID token not the same as configured issuer");

    throw Error("id_token_invalid__issuer_mismatch");
  }

  // The Client MUST validate that the aud (audience) Claim contains its
  // client_id value registered at the Issuer identified by the iss (issuer)
  // Claim as an audience. The ID Token MUST be rejected if the ID Token does
  // not list the Client as a valid audience,
  if (!hasClientIdAudience(idTokenPayload)) {
    LogUtil.error("The ID token does not have the client_id as audience.");

    throw Error("id_token_invalid__no_client_id");
  }

  // or if it contains additional audiences not trusted by the Client.
  if (!hasOnlyTrustedAudiences(idTokenPayload)) {
    LogUtil.error(
      "One or more of the audiences this payload has is not trusted.",
    );

    throw Error("id_token_invalid__audience_mismatch");
  }

  // If the ID Token contains multiple audiences, the Client SHOULD verify that
  // an azp Claim is present.
  if (hasMultipleAudiences(idTokenPayload) && !hasAzpClaim(idTokenPayload)) {
    LogUtil.error(
      "The ID token has multiple audiences, but no AZP claim is present",
    );

    throw Error("id_token_invalid__azp_not_present");
  }

  // If an azp (authorized party) Claim is present, the Client SHOULD verify
  // that its client_id is the Claim Value.
  if (hasAzpClaim(idTokenPayload) && !azpClaimValid(idTokenPayload)) {
    LogUtil.error("The AZP claim does not equal the client_id");

    throw Error("id_token_invalid__azp_invalid");
  }

  // The current time MUST be before the time represented by the exp Claim
  // (possibly allowing for some small leeway to account for clock skew).
  if (tokenIsExpired(idTokenPayload)) {
    LogUtil.error("The ID token is expired");

    throw Error("id_token_invalid__expired");
  }

  // The iat Claim can be used to reject tokens that were issued too far away
  // from the current time, limiting the amount of time that nonces need to be
  // stored to prevent attacks. The acceptable range is Client specific.
  if (iatOffsetTooBig(idTokenPayload)) {
    LogUtil.error("The ID token issued at claim (iat) is from too long ago.");

    throw Error("id_token_invalid__iat_too_old");
  }

  // The value of the nonce Claim MUST be checked to verify that it is the same
  // value as the one that was sent in the Authentication Request. The Client
  // SHOULD check the nonce value for replay attacks. The precise method for
  // detecting replay attacks is Client specific.
  if (!nonceIsValid(idTokenPayload)) {
    LogUtil.error("The ID token nonce does not equal the stored nonce.");

    throw Error("id_token_invalid__nonce_invalid");
  }

  // The Client MUST validate the signature of the ID Token according to JWS
  // [JWS] using the algorithm specified in the alg Header Parameter of the JOSE
  // Header. The Client MUST use the keys provided by the Issuer.
  // The alg value SHOULD be RS256. Validation of tokens using other signing
  // algorithms is described in the OpenID Connect Core 1.0 [OpenID.Core]
  // specification.
  if (!validSignature(idTokenString, header)) {
    LogUtil.error("The ID token signature is invalid");

    throw Error("id_token_invalid__invalid_signature");
  }

  // If the acr Claim was requested, the Client SHOULD check that the asserted
  // Claim Value is appropriate. The meaning and processing of acr Claim Values
  // is out of scope for this document.
  // TODO

  // When a max_age request is made, the Client SHOULD check the auth_time Claim
  // value and request re-authentication if it determines too much time has
  // elapsed since the last End-User authentication.
  // TODO
}
