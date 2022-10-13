import { parseJwt } from "../jwt/parseJwt";
import { LogUtil } from "../utils/log-util";

import type { AuthResultFilter } from "./model/auth-result-filter.model";

/**
 * check if the access token has the required scopes. The access token must be a
 * JWT token with a scope parameter.
 *
 * @param scopes the scopes to check for
 * @returns an AuthResultFilter function
 */
export function accessTokenScopeFilter(scopes: string[]): AuthResultFilter {
  return (authResult) => {
    if (!authResult.access_token) {
      throw Error(
        "Access Token Scope Filter is active, but access token is not defined",
      );
    }
    LogUtil.debug(
      "Running the access token scope filter for authResult:",
      authResult,
    );
    const { payload: accessTokenPayload } = parseJwt(authResult.access_token);

    const valid = scopes.every((requiredScope) =>
      accessTokenPayload.scope.some(
        (accessTokenScope) => accessTokenScope === requiredScope,
      ),
    );
    if (valid) {
      LogUtil.debug("Access Token Scope is valid");
    } else {
      LogUtil.error(
        "Access Token Scope is invalid",
        "required scopes",
        scopes,
        "access token scopes",
        accessTokenPayload.scope,
      );
    }

    return valid;
  };
}
