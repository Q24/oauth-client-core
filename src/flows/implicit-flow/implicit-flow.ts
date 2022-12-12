import {
  getStoredAuthResult,
  storeAuthResult,
} from "../../authentication/auth-result";
import {
  authorize,
  ensureNoErrorInParameters,
} from "../../authentication/authorize";
import { config } from "../../configuration/config.service";
import { discovery } from "../../discovery/discovery";
import {
  isValidNewAuthResult,
  isValidStoredAuthResult,
} from "../../jwt/validate-auth-result";
import { cleanSessionStorage } from "../../utils/clean-session-storage";
import { LogUtil } from "../../utils/log-util";
import { transformScopesStringToArray } from "../../utils/scope";
import { clearQueryParameters } from "../../utils/url";
import {
  deleteStoredHashString,
  getAuthResultFromStoredHash,
  getAuthResultFromUrl,
} from "./hash";
import { createImplicitFlowAuthorizeRequestParameters } from "./implicit-flow-authorize-params";
import { silentRefresh } from "./implicit-flow-refresh";
import { getSessionUpgradeToken, sessionUpgrade } from "./session-upgrade";

import type { AuthValidationOptions } from "../../jwt/model/auth-validation-options.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";

/**
 * If possible, do a session upgrade.
 *
 * Otherwise, if possible, return the auth result from:
 * 1. Hash of URL
 * 1. Hash in session storage (can be saved and cleared by other script)
 * 1. Session storage
 * 1. Silent refresh
 *
 * If there is no Auth Result to be found in all of these places, do a redirect
 * to the authorization server, so that a future call to this function may get
 * the Auth Results from the URL that was redirected to by the authentication
 * server.
 *
 * @param authValidationOptions the scope for the silent refresh and the extra
 * result filters
 * @throws It will reject (as well as redirect) in case the check did not pass.
 */
export async function implicitFlow(
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  await discovery();

  const sessionUpgradeToken = getSessionUpgradeToken();
  if (sessionUpgradeToken) {
    return sessionUpgrade(sessionUpgradeToken);
  }

  // 1. Get the auth result from the URL parameters and clear parameters from URL
  const authResultFromUrl = getAuthResultFromUrl();
  if (authResultFromUrl) {
    if (await isValidNewAuthResult(authResultFromUrl)) {
      storeAuthResult(authResultFromUrl);
      clearQueryParameters();
      if (
        isValidStoredAuthResult(
          authResultFromUrl,
          authValidationOptions?.extraAuthFilters || [],
        )
      ) {
        return authResultFromUrl;
      }
    }
  }

  // 2. Get the auth result from the hash previously stored in session storage,
  //    and clear it afterwards.
  const authResultFromStoredHash = getAuthResultFromStoredHash();
  if (authResultFromStoredHash) {
    if (await isValidNewAuthResult(authResultFromStoredHash)) {
      storeAuthResult(authResultFromStoredHash);
      deleteStoredHashString();
      if (
        isValidStoredAuthResult(
          authResultFromStoredHash,
          authValidationOptions?.extraAuthFilters || [],
        )
      ) {
        return authResultFromStoredHash;
      }
    }
  }

  // 3. Get the auth result from the session storage
  const storedAuthResult = getStoredAuthResult();
  if (
    storedAuthResult &&
    isValidStoredAuthResult(
      storedAuthResult,
      authValidationOptions?.extraAuthFilters || [],
    )
  ) {
    // As the stored result is already validated upon storing, there is no need
    // to validate it as new result.
    return storedAuthResult;
  }

  // 4. get the auth result from a silent refresh
  // TODO: Reenable this once we find a way to Catch the `ERROR DOMException: Blocked a frame with origin 'origin'` error.
  // const authResultFromSilentRefresh = await silentRefresh(
  //   authValidationOptions,
  // ).catch(() => null);
  // if (authResultFromSilentRefresh) {
  //   if (await isValidNewAuthResult(authResultFromSilentRefresh)) {
  //     storeAuthResult(authResultFromSilentRefresh);
  //     if (
  //       isValidStoredAuthResult(
  //         authResultFromSilentRefresh,
  //         authValidationOptions?.extraAuthFilters || [],
  //       )
  //     ) {
  //       return authResultFromSilentRefresh;
  //     }
  //   }
  // }

  // There is no auth result; try to get one for the next time we call this
  // function, by redirecting to the authorize endpoint.
  return implicitFlowAuthorizeFlow();
}

/**
 * HTTP Redirect to the Authorisation.
 *
 * This redirects (with authorize params) to the Authorisation.
 * The Authorisation checks if there is a valid session. If so, it returns with token hash.
 * If not authenticated, it will redirect to the login page.
 */
async function implicitFlowAuthorizeFlow(): Promise<AuthResult> {
  ensureNoErrorInParameters();

  cleanSessionStorage();

  const scopes = transformScopesStringToArray(config.scope);
  const authorizeParams = createImplicitFlowAuthorizeRequestParameters(scopes);

  // All clear ->
  // Do the authorize redirect
  LogUtil.debug(
    "Do authorisation redirect to SSO with options:",
    authorizeParams,
  );

  return authorize(authorizeParams);
}
