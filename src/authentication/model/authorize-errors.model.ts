/**
 * A set of strings to match when the Authorize redirect is erroring. This is the complete list of possible error to handle.
 * https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 */
export type AuthorizeErrors =
  "invalid_client"
  | "unauthorized_client"
  | "invalid_grant"
  | "unsupported_grant_type"
  | "invalid_scope"
  | "invalid_request_response_type"
  | "invalid_request_type"
  | "invalid_request_openid_type"
  | "invalid_request_redirect_uri"
  | "invalid_request_signature"
  | "invalid_request_realm"
  | "invalid_request_atype"
  | "invalid_request_recipient";
