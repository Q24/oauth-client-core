import { LogUtil } from '../../utils/log-util';
import { accessTokenRequest } from './code-flow-access-token-request';
import { deleteStoredRefreshToken, getStoredRefreshToken, } from './refresh-token';
import { config } from '../../configuration/config.service';

import type { OAuthRefreshTokenParameters } from './model/refresh-token-request.model';
import type { AuthResult } from '../../jwt/model/auth-result.model';
import { storeAuthResult } from '../../authentication/auth-result';
import { isValidNewAuthResult } from '../../jwt/validate-auth-result';

/**
 * @returns the refresh parameters for the token endpoint
 */
export function createCodeFlowRefreshRequestParameters(): OAuthRefreshTokenParameters {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) {
    throw Error("no refresh token");
  }

  return {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: config.client_id,
  };
}

/**
 * Gets a new auth result by means of a refresh request to the tokens endpoint.
 *
 * @returns An Auth result, if the refresh was successful, otherwise null
 */
export async function codeFlowRefreshAccessToken(): Promise<AuthResult | null> {
  const requestParameters = createCodeFlowRefreshRequestParameters();
  try {
    const authResult = await accessTokenRequest(requestParameters);
    if (await isValidNewAuthResult(authResult)) {
      deleteStoredRefreshToken();
      storeAuthResult(authResult);
      return authResult;
    } else 
    LogUtil.error("Token from refresh is not valid");
    return null;
  } catch (e) {
    deleteStoredRefreshToken();
    LogUtil.error("Could not successfully refresh the access token", e);
    return null;
  }
}
