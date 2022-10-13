import { LogUtil } from "../utils/log-util";
import { getJwks } from "./get-jwks";
import { getOpenIdProviderMetadata } from "./get-openid-provider-metadata";

/**
 * A singleton promise used for initialization.
 */
let discoveryPromise: Promise<void> | null = null;

async function _discovery() {
  await getOpenIdProviderMetadata();
  await getJwks();
}

/**
 * Used for obtaining OpenID Provider configuration information. The discovery
 * will only be done once. Further calls to the discovery endpoint will result
 * in a singleton promise being returned.
 *
 * Discovery will automatically be done by the checkSession method.
 *
 * @returns A promise which will resolve when the discovery is complete
 */
export async function discovery(): Promise<void> {
  if (discoveryPromise) {
    return discoveryPromise;
  }
  discoveryPromise = _discovery().catch((reason) => {
    discoveryPromise = null;
    LogUtil.error("Discovery failed", reason);
    throw Error(reason);
  });
  return discoveryPromise;
}
