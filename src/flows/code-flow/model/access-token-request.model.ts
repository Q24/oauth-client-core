export interface OAuthCodeFlowAccessTokenParameters {
  grant_type: "authorization_code";

  /**
   * The authorization code received from the authorization server.
   */
  code: string;

  /**
   * REQUIRED, if the "redirect_uri" parameter was included in the authorization
   * request as described in Section 4.1.1, and their values MUST be identical.
   */
  redirect_uri: string;

  /**
   * REQUIRED, if the client is not authenticating with the authorization server
   * as described in Section 3.2.1.
   */
  client_id: string;
  /**
   * Code verifier
   */
  code_verifier: string;
}
