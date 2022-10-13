import { LogUtil } from "../utils/log-util";
import { KJUR, hextob64u } from "jsrsasign-reduced";
import { parseIdToken } from "./parseJwt";
import type { AuthResult } from "./model/auth-result.model";
import { isCodeFlow } from "../utils/is-code-flow";

function generateAtHash(accessToken: string, sha: string): string {
  const hash = KJUR.crypto.Util.hashString(accessToken, sha);
  const first128bits = hash.substr(0, hash.length / 2);
  const testData = hextob64u(first128bits);

  return testData;
}

/**
 * (1) Hash the octets of the ASCII representation of the access_token with
 * the hash algorithm specified in JWA [JWA] for the alg Header Parameter of
 * the ID Token's JOSE Header. For instance, if the alg is RS256, the hash
 * algorithm used is SHA-256. (2) Take the left-most half of the hash and
 * base64url-encode it. (3) The value of at_hash in the ID Token MUST match
 * the value produced in the previous step if at_hash is present in the ID
 * Token.
 *
 * @param authResult the result from the authentication call
 */
export function validateAccessToken(authResult: AuthResult): void {
  // If there is no access token, we don't have to validate it.
  if (!authResult.access_token) {
    return;
  }
  const idToken = parseIdToken(authResult.id_token);
  if (isCodeFlow() && !idToken.payload.at_hash) {
    return;
  }

  if (
    !validateIdTokenAtHash(
      authResult.access_token,
      idToken.payload.at_hash,
      idToken.header.alg,
    )
  ) {
    LogUtil.error("Could not validate Access Token Hash (at_hash)");
    throw Error("at_hash invalid");
  }
}

function validateIdTokenAtHash(
  accessToken: string,
  atHash: string,
  idTokenAlg: string,
): boolean {
  LogUtil.debug("validating at_hash", atHash);

  const sha = idTokenAlg.includes("384")
    ? "sha348"
    : idTokenAlg.includes("512")
    ? "sha512"
    : "sha256";

  const testData = generateAtHash(accessToken, sha);
  LogUtil.debug("at_hash client validation not decoded:" + testData);
  if (testData === atHash) {
    return true;
  } else {
    const testValue = generateAtHash(decodeURIComponent(accessToken), sha);
    LogUtil.debug("-gen access--", testValue);
    return testValue === atHash;
  }
}
