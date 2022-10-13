import { config } from "../../configuration/config.service";
import { assertProviderMetadata } from "../../discovery/assert-provider-metadata";
import { discoveryState } from "../../discovery/discovery-state";
import { LogUtil } from "../../utils/log-util";
import { timeout } from "../../utils/timeout";
import {
  clearQueryParameters,
  getHashParameters,
  parseQueryParameters,
  toUrlParameterString,
} from "../../utils/url";
import { deleteStoredHashString, getStoredHashString } from "./hash";

import type { AuthResult } from "../../jwt/model/auth-result.model";

export function getSessionUpgradeToken(): string | null {
  const authResultFromUrl = getHashParameters<Partial<AuthResult>>();
  if (authResultFromUrl.session_upgrade_token) {
    clearQueryParameters();
    return authResultFromUrl.session_upgrade_token;
  }

  const hashStringFromStorage = getStoredHashString();
  if (!hashStringFromStorage) {
    return null;
  }
  const hashResultFromStorage = parseQueryParameters<Partial<AuthResult>>(
    hashStringFromStorage,
  );
  if (!hashResultFromStorage.session_upgrade_token) {
    return null;
  }
  deleteStoredHashString();
  return hashResultFromStorage.session_upgrade_token;
}

/**
 * HTTP Redirect to the Authorisation.
 *
 * This redirects (with session upgrade params) to the Authorisation.
 * The Authorisation then upgrades the session, and will then redirect back. The next authorizeRedirect() call will
 * then return a valid token, because the session was upgraded.
 */
export async function sessionUpgrade(
  sessionUpgradeToken: string,
): Promise<AuthResult> {
  const urlVars = {
    session_upgrade_token: sessionUpgradeToken,
    redirect_uri: `${config.redirect_uri}?flush_state=true`,
  };

  LogUtil.debug(
    "Session upgrade function triggered with token: ",
    sessionUpgradeToken,
  );

  // Do the authorize redirect
  const urlParams = toUrlParameterString(urlVars);
  assertProviderMetadata(discoveryState.providerMetadata);
  window.location.href = `${discoveryState.providerMetadata.issuer}/upgrade-session?${urlParams}`;

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(7000);
  throw Error("authorize_redirect_timeout");
}
