export interface OAuthRefreshTokenParameters {
  grant_type: "refresh_token";

  /**
   * The refresh token issued to the client.
   */
  refresh_token: string;

  /**
   * The scope of the access request as described by Section 3.3.  The requested
   * scope MUST NOT include any scope not originally granted by the resource
   * owner, and if omitted is treated as equal to the scope originally granted
   * by the resource owner.
   */
  scope?: string;
}