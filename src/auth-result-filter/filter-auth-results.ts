import type { AuthResult } from "../jwt/model/auth-result.model";
import type { AuthResultFilter } from "./model/auth-result-filter.model";

/**
 * gets a list of authentication results which pass the filters.
 *
 * @param authResults the authentication result
 * @param authResultFilters a list of functions which determine if the token should be used
 * @returns a list of authentication results which pass all the filters
 */
export function filterAuthResults(
  authResults: AuthResult[],
  authResultFilters: AuthResultFilter[],
): AuthResult[] {
  const passedAuthResults = authResults.filter((authResult) =>
    authResultFilters.every((filter) => filter(authResult)),
  );
  return passedAuthResults;
}
