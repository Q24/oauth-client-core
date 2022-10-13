export interface IdTokenPayload {
  /**
   * Issuer Identifier for the Issuer of the response.
   *
   * The iss value is a case-sensitive URL using the https scheme that contains
   * scheme, host, and optionally, port number and path components and no query
   * or fragment components.
   */
  iss: string;

  /**
   * Subject Identifier.
   *
   * Locally unique and never reassigned identifier within the Issuer for the
   * End-User, which is intended to be consumed by the Client, e.g., 24400320 or
   * AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255 ASCII
   * characters in length. The sub value is a case-sensitive string.
   */
  sub: string;

  /**
   * Audience(s) that this ID Token is intended for. 
   *
   * It MUST contain the OAuth 2.0 client_id of the Relying Party as an audience
   * value. It MAY also contain identifiers for other audiences. In the general
   * case, the aud value is an array of case-sensitive strings. In the common
   * special case when there is one audience, the aud value MAY be a single
   * case-sensitive string.
   */
  aud: string | string[];

  /**
   * Expiration time on or after which the ID Token MUST NOT be accepted for
   * processing. 
   *
   * The processing of this parameter requires that the current date/time MUST
   * be before the expiration date/time listed in the value. Implementers MAY
   * provide for some small leeway, usually no more than a few minutes, to
   * account for clock skew. Its value is a JSON [RFC7159] number representing
   * the number of seconds from 1970-01-01T00:00:00Z as measured in UTC until
   * the date/time. See RFC 3339 [RFC3339] for details regarding date/times in
   * general and UTC in particular.
   */
  exp: number;

  /**
   * Time at which the JWT was issued.
   *
   * Its value is a JSON number representing the number of seconds from
   * 1970-01-01T00:00:00Z as measured in UTC until the date/time.
   */
  iat: number;

  /**
   * Time when the End-User authentication occurred. 
   *
   * Its value is a JSON number representing the number of seconds from
   * 1970-01-01T00:00:00Z as measured in UTC until the date/time. When a max_age
   * request is made then this Claim is REQUIRED; otherwise, its inclusion is
   * OPTIONAL.
   */
  auth_time?: string;
  /**
   * String value used to associate a Client session with an ID Token, and to
   * mitigate replay attacks. 
   *
   * The value is passed through unmodified from the Authentication Request to
   * the ID Token. Clients MUST verify that the nonce Claim Value is equal to
   * the value of the nonce parameter sent in the Authentication Request. If
   * present in the Authentication Request, Authorization Servers MUST include a
   * nonce Claim in the ID Token with the Claim Value being the nonce value sent
   * in the Authentication Request. The nonce value is a case-sensitive string.
   */
  nonce: string;

  /**
   * Access Token hash value. 
   *
   * If the ID Token is issued with an access_token in an Implicit Flow, this is
   * REQUIRED, which is the case for this subset of OpenID Connect. Its value is
   * the base64url encoding of the left-most half of the hash of the octets of
   * the ASCII representation of the access_token value, where the hash
   * algorithm used is the hash algorithm used in the alg Header Parameter of
   * the ID Token's JOSE Header. For instance, if the alg is RS256, hash the
   * access_token value with SHA-256, then take the left-most 128 bits and
   * base64url-encode them. The at_hash value is a case-sensitive string.
   */
  at_hash: string;

  /**
   * Authentication Context Class Reference. 
   *
   * String specifying an Authentication Context Class Reference value that
   * identifies the Authentication Context Class that the authentication
   * performed satisfied. The value "0" indicates the End-User authentication
   * did not meet the requirements of ISO/IEC 29115 [ISO29115] level 1. For
   * historic reasons, the value "0" is used to indicate that there is no
   * confidence that the same person is actually there. Authentications with
   * level 0 SHOULD NOT be used to authorize access to any resource of any
   * monetary value. An absolute URI or an RFC 6711 [RFC6711] registered name
   * SHOULD be used as the acr value; registered names MUST NOT be used with a
   * different meaning than that which is registered. Parties using this claim
   * will need to agree upon the meanings of the values used, which may be
   * context specific. The acr value is a case-sensitive string.
   */
  acr?: string;

  /**
   * Authentication Methods References. 
   *
   * JSON array of strings that are identifiers for authentication methods used
   * in the authentication. For instance, values might indicate that both
   * password and OTP authentication methods were used. The definition of
   * particular values to be used in the amr Claim is beyond the scope of this
   * document. Parties using this claim will need to agree upon the meanings of
   * the values used, which may be context specific. The amr value is an array
   * of case-sensitive strings.
   */
  amr?: string;
  /**
   * Authorized party - the party to which the ID Token was issued.
   *
   * If present, it MUST contain the OAuth 2.0 Client ID of this party. This
   * Claim is only needed when the ID Token has a single audience value and that
   * audience is different than the authorized party. It MAY be included even
   * when the authorized party is the same as the sole audience. The azp value
   * is a case-sensitive string containing a StringOrURI value.
   */
  azp?: string;

  /**
   * Public key used to check the signature of an ID Token issued by a
   * Self-Issued OpenID Provider, as specified in Section 3. 
   *
   * The key is a bare key in JWK [JWK] format (not an X.509 certificate value).
   * Use of the sub_jwk Claim is REQUIRED when the OP is a Self-Issued OP and is
   * NOT RECOMMENDED when the OP is not Self-Issued. The sub_jwk value is a JSON
   * object.
   */
  sub_jwk?: unknown;
}
