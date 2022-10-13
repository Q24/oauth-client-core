import type {AuthResultFilter} from "../../auth-result-filter/model/auth-result-filter.model";

/**
 * An object that is used to determine whether a token
 * meets requirements set forth herein, such as a scope.
 */
export interface AuthValidationOptions {
  /**
   * A list of scopes that the token must have.
   */
  scopes?: string[];
  /**
   * A custom validation function that is called when trying
   * to retrieve a (possibly pre-existing) Token.
   */
  extraAuthFilters?: AuthResultFilter[];
}
