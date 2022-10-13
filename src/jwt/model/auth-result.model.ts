/**
 * https://openid.net/specs/openid-connect-implicit-1_0.html#ImplicitOK
 *
 * If the End-User grants the access request, the Authorization Server issues an
 * Access Token and delivers it to the Client by adding the following parameters
 * to the fragment component of the Redirection URI using the
 * application/x-www-form-urlencoded format as defined in Section 4.2.2 of OAuth
 * 2.0 [RFC6749] and OAuth 2.0 Multiple Response Type Encoding Practices
 * [OAuth.Responses].
 *
 * In the Implicit Flow, the entire response is returned in the fragment
 * component of the Redirection URI, as defined in 4.2.2 of OAuth 2.0 [RFC6749].
 */
export interface AuthResult {
  /**
   * Access Token for the UserInfo Endpoint.
   */
  access_token?: string;
  /**
   * REQUIRED. OAuth 2.0 Token Type value. The value MUST be Bearer, as
   * specified in OAuth 2.0 Bearer Token Usage [RFC6750], for Clients using this
   * subset. Note that the token_type value is case insensitive.
   */
  token_type?: "Bearer";
  /**
   * OAuth 2.0 discoveryState value. REQUIRED if the discoveryState parameter is present in the
   * Authorization Request. Clients MUST verify that the discoveryState value is equal to
   * the value of discoveryState parameter in the Authorization Request.
   */
  state: string;
  /**
   * ID Token
   */
  id_token: string;
  /**
   * Expiration time of the Access Token in seconds since the response was
   * generated.
   */
  expires_in?: string;
  /**
   * Expiry time of token
   */
  expires?: number;
  /**
   * Session Upgrade token received from Authorisation
   */
  session_upgrade_token?: string;

  /**
   * Only for code flow.
   */
  refresh_token?: string;
}
