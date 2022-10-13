import { codeFlow } from "../flows/code-flow/code-flow";
import { implicitFlow } from "../flows/implicit-flow/implicit-flow";
import { isCodeFlow } from "../utils/is-code-flow";

import type { AuthResult } from "../jwt/model/auth-result.model";
import type { AuthValidationOptions } from "../jwt/model/auth-validation-options.model";

export function obtainSession(
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  if (isCodeFlow()) {
    return codeFlow(authValidationOptions);
  }
  return implicitFlow(authValidationOptions);
}
