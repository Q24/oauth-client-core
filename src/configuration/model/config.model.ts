import type { AuthResultFilter } from "../../auth-result-filter/model/auth-result-filter.model";

/**
 * Config Object for OIDC Service
 */
export interface OAuthClientConfig {
  /**
   * Set the ID of your client
   */
  client_id: string;

  /**
   * What type of token(s) you wish to receive
   * In case op Open Id Connect this is usually `token id_token`
   */
  response_type: "id_token" | "id_token token" | "code";

  /**
   * The URL you want to be redirected to after redirect from Authorization
   */
  redirect_uri: string;

  /**
   * The URL you want to be redirected to after redirect from Authorization, while doing a silent access token refresh
   */
  silent_refresh_uri?: string;

  /**
   * The URL you want to use for a silent Logout, if your stack supports it.
   */
  silent_logout_uri?: string;

  /**
   * The URL you want to be redirected to after logging out
   */
  post_logout_redirect_uri?: string;

  /**
   * Define the scopes you want access to. Each scope is separated by space.
   * When using Open Id Connect, scope `openid` is mandatory
   */
  scope: string;

  /**
   * CSRF token endpoint
   */
  csrf_token_endpoint?: string;

  /**
   * Validate received token endpoint
   */
  validate_token_endpoint?: string;

  /**
   * Endpoint for checking if a session is still used somewhere
   */
  is_session_alive_endpoint?: string;

  /**
   * Verbose logging of inner workings of the package.
   */
  debug?: boolean;

  /**
   * Audiences (client_ids) other than the current client which are allowed in
   * the audiences claim.
   */
  trusted_audiences?: string[];

  /**
   * The maximum time to pass between the issuance and consumption of an
   * authentication result.
   */
  issuedAtMaxOffset?: number;

  /**
   * The base issuer URL.
   */
  issuer: string;

  /**
   * A list of filters each auth result must adhere to.
   */
  defaultAuthResultFilters?: AuthResultFilter[];

  /**
   * Hint to the Authorization Server about the login identifier the End-User
   * might use to log in (if necessary). This hint can be used by a Relying
   * Party (RP) if it first asks the End-User for their e-mail address (or other
   * identifier) and then wants to pass that value as a hint to the discovered
   * authorization service. It is RECOMMENDED that the hint value match the
   * value used for discovery. This value MAY also be a phone number in the
   * format specified for the `phone_number` Claim. The use of this parameter is
   * left to the OpenID Provider's discretion.
   */
  login_hint?: string;
}
