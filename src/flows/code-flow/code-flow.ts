import {
  getStoredAuthResult,
  storeAuthResult,
} from "../../authentication/auth-result";
import {
  authorize,
  ensureNoErrorInParameters,
} from "../../authentication/authorize";
import { discovery } from "../../discovery/discovery";
import {
  isValidNewAuthResult,
  isValidStoredAuthResult,
} from "../../jwt/validate-auth-result";
import { LogUtil } from "../../utils/log-util";
import { cleanUrl } from "../../utils/url";
import {
  accessTokenRequest,
  createCodeFlowAccessTokenRequestParameters,
} from "./code-flow-access-token-request";
import { createCodeFlowAuthorizeRequestParameters } from "./code-flow-authorize-params";
import { codeFlowRefreshAccessToken } from "./code-flow-refresh";
import { getCodeFromUrl } from "./get-code-from-url";
import { getStoredRefreshToken } from "./refresh-token";

import type { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";
import type { AuthValidationOptions } from "../../jwt/model/auth-validation-options.model";

export async function codeFlow(
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  await discovery();

  LogUtil.debug("Looking for a code in the URL");
  const code = getCodeFromUrl();
  if (code) {
    LogUtil.debug(
      "The URL does have a code; save it in memory and clear the URL",
    );
    cleanUrl();

    const codeFlowAuthResult = await codeFlowAccessTokenFlow(code);
    LogUtil.debug("Got auth result by token request", codeFlowAuthResult);

    if (codeFlowAuthResult) {
      if (await isValidNewAuthResult(codeFlowAuthResult)) {
        storeAuthResult(codeFlowAuthResult);
        if (
          isValidStoredAuthResult(
            codeFlowAuthResult,
            authValidationOptions?.extraAuthFilters || [],
          )
        ) {
          return codeFlowAuthResult;
        }
      }
    }
  } else {
    LogUtil.debug("There is no code in the URL");
  }

  LogUtil.debug("looking for auth result in storage");
  const storedAuthResult = getStoredAuthResult();
  if (
    storedAuthResult &&
    isValidStoredAuthResult(
      storedAuthResult,
      authValidationOptions?.extraAuthFilters || [],
    )
  ) {
    LogUtil.debug("Found a valid auth result in storage, returning it.");

    return storedAuthResult;
  } else {
    LogUtil.debug("There is no auth result in storage");
  }

  LogUtil.debug("Looking for a refresh token in storage");
  const refreshToken = getStoredRefreshToken();
  if (refreshToken) {
    const authResult = await codeFlowRefreshAccessToken();
    if (authResult) {
      if (await isValidNewAuthResult(authResult)) {
        storeAuthResult(authResult);
        if (
          isValidStoredAuthResult(
            authResult,
            authValidationOptions?.extraAuthFilters || [],
          )
        ) {
          return authResult;
        }
      }
    }
  } else {
    LogUtil.debug("No refresh token in storage");
  }

  return codeFlowAuthorizeFlow();
}

/**
 * Authorizes the user against the authentication server
 * @returns
 */
async function codeFlowAuthorizeFlow(): Promise<AuthResult> {
  LogUtil.debug("Do a authorize call");

  ensureNoErrorInParameters();
  // Create Code Flow Authorize request parameters.
  const authorizeRequestParameters: OAuthCodeFlowAuthorizeParameters =
    createCodeFlowAuthorizeRequestParameters();

  // Send code challenge to server via client side redirect -> server returns authorization code
  return authorize(authorizeRequestParameters);
}

/**
 * Gets a authentication token from the token endpoint
 *
 * @param oAuthCodeFlowAuthorizeResponse
 * @param config
 * @returns
 */
async function codeFlowAccessTokenFlow(code: string): Promise<AuthResult> {
  LogUtil.debug(
    "Getting the access token from the token endpoint with code",
    code,
  );

  const accessTokenRequestParameters =
    createCodeFlowAccessTokenRequestParameters({
      code,
    });

  return accessTokenRequest(accessTokenRequestParameters);
}
