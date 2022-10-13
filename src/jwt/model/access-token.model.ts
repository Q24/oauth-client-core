/**
 * A JSON Web Token, unpacked. Is used for describing the contents
 * of an access token.
 */
 export interface AccessTokenPayload {
  /**
   * The scopes the token has.
   */
  scope: string[];

  /**
   * The expiration date of the token.
   */
  exp?: number;

  /**
   * Subject
   */
  sub?: string;

  /**
   * Authorized party
   */
  azp?: string;

  /**
   * Issuer
   */
  iss?: string;

  /**
   * Issued At time
   */
  iat?: number;

  /**
   * JWT ID (unique for token)
   */
  jti?: string;
}