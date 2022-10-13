import type { JsonWebKeySet } from "./model/jwks.model";
import { LogUtil } from "../utils/log-util";
import { assertProviderMetadata } from "./assert-provider-metadata";
import { getOpenIdProviderMetadata } from "./get-openid-provider-metadata";
import {discoveryState} from './discovery-state';

function fetchJwks(): Promise<JsonWebKeySet> {
  return new Promise<JsonWebKeySet>((resolve, reject) => {
    LogUtil.debug("getting jwks");
    const xhr = new XMLHttpRequest();

    assertProviderMetadata(discoveryState.providerMetadata);

    xhr.open("GET", discoveryState.providerMetadata.jwks_uri, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          const jwks = JSON.parse(xhr.responseText);
          LogUtil.debug("successfully got jwks", jwks);
          resolve(jwks);
        } else {
          LogUtil.error("could not get jwks", xhr.statusText);
          reject(xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}

/**
 * Gets the remote JsonWebKeySet; Sets the local JsonWebKeySet
 *
 * @returns the JsonWebKeySet
 */
export async function getRemoteJwks(): Promise<JsonWebKeySet> {
  const providerMetadata = await getOpenIdProviderMetadata();
  if (!providerMetadata.jwks_uri) {
    LogUtil.error(
      "No JWKS URI found in OpenID Provider Metadata",
      providerMetadata,
    );
    throw Error("no_jwks_uri");
  }
  const jwks = await fetchJwks();
  discoveryState.jwks = jwks;

  return jwks;
}

/**
 * tries to get the local jwks; if not found, get the remote jwks.
 *
 * @returns the jwks
 */
export async function getJwks(): Promise<JsonWebKeySet> {
  if (discoveryState.jwks) {
    return discoveryState.jwks;
  }
  return getRemoteJwks();
}
