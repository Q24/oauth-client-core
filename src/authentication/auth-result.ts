import { getAllAuthResultFilters } from "../auth-result-filter/all-filters";
import { filterAuthResults } from "../auth-result-filter/filter-auth-results";
import { config } from "../configuration/config.service";
import { storeRefreshToken } from "../flows/code-flow/refresh-token";
import { storeIdToken } from "../open-id/id-token-hint";
import { LogUtil } from "../utils/log-util";
import { StorageUtil } from "../utils/storage";
import { epochSeconds } from "../utils/time";

import type { AuthResultFilter } from "../auth-result-filter/model/auth-result-filter.model";
import type { AuthResult } from "../jwt/model/auth-result.model";

/**
 * Deletes all the auth results from the storage. If authResultFilter is passed
 * in, only a subset will be deleted.
 *
 * @param authResultFilter if specified, the authResultFilter is called for
 * every auth result in the store. If a authResultFilter callback returns true,
 * the auth result will remain in the store. Otherwise, it will be deleted (Just
 * like Array.prototype.filter())
 */
export function deleteStoredAuthResults(
  authResultFilter?: (authResult: Readonly<AuthResult>) => boolean,
): void {
  if (authResultFilter) {
    deleteStoredAuthResultsFiltered(authResultFilter);
  } else {
    LogUtil.debug(`Removed Tokens from session storage`);
    StorageUtil.remove("-authResult");
  }
}

function deleteStoredAuthResultsFiltered(
  authResultFilter: AuthResultFilter,
): void {
  const allAuthResults = getStoredAuthResults();
  const authResultsToStore = allAuthResults.filter(authResultFilter);
  storeAuthResults(authResultsToStore);
}

function createAuthResultKey() {
  return `${config.client_id}-authResult`;
}

/**
 * Get all auth results stored in session StorageUtil in an Array
 */
function getStoredAuthResults(): AuthResult[] {
  const storedAuthResults = StorageUtil.read(createAuthResultKey());
  if (!storedAuthResults) {
    return [];
  }
  return JSON.parse(storedAuthResults);
}

/**
 * Stores an array of auth results to the session StorageUtil
 */
function storeAuthResults(authResults: AuthResult[]): void {
  LogUtil.debug("Saved Auth Results to session storage");
  StorageUtil.store(createAuthResultKey(), JSON.stringify(authResults));
}

/**
 * Compare the expiry time of a stored auth result with the current time.
 * If the auth results has expired, remove it from the array.
 * If something was removed from the Array, cleanup the session storage by re-saving the cleaned auth results array.
 *
 * @returns the cleaned array.
 */
function filterUnexpiredAuthResults(
  storedAuthResults: AuthResult[],
  time: number,
): AuthResult[] {
  return storedAuthResults.filter((authResult: AuthResult) => {
    // Auth results which don't expire should always be valid.
    if (!authResult.expires) {
      return true;
    }
    return authResult.expires && authResult.expires > time + 5;
  });
}

/**
 * Gets a valid, non-expired token from session storage given a set of validators.
 *
 * @param tokenValidationOptions the required scopes and other validators
 * @returns A valid Token or `null` if no token has been found.
 */
export function getStoredAuthResult(
  extraAuthResultFilters?: AuthResultFilter[],
): AuthResult | null {
  // Get the tokens from storage, and make sure they're still valid
  const authResults = getStoredAuthResults();
  const currentTime = epochSeconds();
  const unexpiredAuthResults = filterUnexpiredAuthResults(
    authResults,
    currentTime,
  );

  const applicableAuthResults = filterAuthResults(
    unexpiredAuthResults,
    getAllAuthResultFilters(extraAuthResultFilters),
  );

  // If there's no valid token return null
  if (applicableAuthResults.length < 1) {
    LogUtil.debug("No valid token found in storage");
    return null;
  }
  // Return the first valid token
  return applicableAuthResults[0];
}

/**
 * * Get the current Stored tokens
 * * Separately save the ID Token, as a hint for when the access token gets cleaned. This will help logout.
 * * Set the tokens expiry time. Current time in seconds + (token lifetime in seconds - x seconds)
 * * Put the new token to the beginning of the array, so it's the first one returned
 * * Clean expired tokens from the Array
 * * Save the new token array
 * * Return the cleaned set of Tokens
 */
export function storeAuthResult(authResult: AuthResult): void {
  LogUtil.debug("storing auth result");
  const storedAuthResults = getStoredAuthResults();

  if (authResult.id_token) {
    LogUtil.debug("Auth result has id token, storing it");
    storeIdToken(authResult.id_token);
  }

  if (authResult.refresh_token) {
    LogUtil.debug("Auth result has refresh token, storing it");
    storeRefreshToken(authResult.refresh_token);
  }

  authResult.expires = authResult.expires_in
    ? epochSeconds() + (parseInt(authResult.expires_in, 10) - 30)
    : undefined;
  storedAuthResults.unshift(authResult);

  const currentTime = epochSeconds();
  const tokensCleaned = filterUnexpiredAuthResults(
    storedAuthResults,
    currentTime,
  );

  storeAuthResults(tokensCleaned);
}

/**
 * checks if an object is an auth result.
 *
 * @param potentialAuthResult an object
 * @returns whether or not an object is an auth result
 */
export function isAuthResult(
  potentialAuthResult: Partial<AuthResult>,
): potentialAuthResult is AuthResult {
  if (!potentialAuthResult.id_token || !potentialAuthResult.state) {
    return false;
  }

  return true;
}
