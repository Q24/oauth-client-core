import type { AuthResult } from "../jwt/model/auth-result.model";

/**
 * Get the Authorization header for usage with rest calls.
 *
 * Uses the token type present in the token.
 */
export function getAuthHeader(authResult: AuthResult): string {
  return `${authResult.token_type} ${authResult.access_token}`;
}
