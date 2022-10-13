import { validateAuthResultBackend } from "../backend-check/validate-auth-result-backend";
import { usesOpenId } from "../open-id/uses-openid";
import { isCodeFlow } from "../utils/is-code-flow";
import { validateAccessToken } from "./access-token-validation";
import { validateIdToken } from "./id-token-validation";
import { validateState } from "./state-validation";

import type { AuthResultFilter } from "../auth-result-filter/model/auth-result-filter.model";
import type { AuthResult } from "./model/auth-result.model";
export function validateAuthResult(authResult: AuthResult): void {
  if (!isCodeFlow()) {
    validateState(authResult.state);
  }
  if (usesOpenId()) {
    validateIdToken(authResult.id_token);
    validateAccessToken(authResult);
  }
}

export async function isValidNewAuthResult(
  authResult: AuthResult,
): Promise<boolean> {
  try {
    validateAuthResult(authResult);
    await validateAuthResultBackend(authResult);
    return true;
  } catch (error) {
    return false;
  }
}

export function isValidStoredAuthResult(
  storedAuthResult: AuthResult,
  authResultFilters: AuthResultFilter[],
): boolean {
  if (authResultFilters.every((filter) => filter(storedAuthResult))) {
    return true;
  }
  return false;
}
