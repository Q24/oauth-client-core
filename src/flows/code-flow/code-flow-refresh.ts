import { LogUtil } from "../../utils/log-util";
import { accessTokenRequest } from "./code-flow-access-token-request";
import {
  deleteStoredRefreshToken,
  getStoredRefreshToken,
} from "./refresh-token";

import type { OAuthRefreshTokenParameters } from "./model/refresh-token-request.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";
/**
 * @returns the refresh parameters for the token endpoint
 */
export function createCodeFlowRefreshRequestParameters(): OAuthRefreshTokenParameters {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) {
    throw Error("no refresh token");
  }

  const oAuthCodeFlowRefreshParameters: OAuthRefreshTokenParameters = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  return oAuthCodeFlowRefreshParameters;
}

/**
 * Gets a new auth result by means of a refresh request to the tokens endpoint.
 *
 * @returns An Auth result, if the refresh was successful, otherwise null
 */
export async function codeFlowRefreshAccessToken(): Promise<AuthResult | null> {
  const requestParameters = createCodeFlowRefreshRequestParameters();
  try {
    return accessTokenRequest(requestParameters);
  } catch (e) {
    LogUtil.error("Could not successfully refresh the access token", e);
    return null;
  } finally {
    deleteStoredRefreshToken();
  }
}
