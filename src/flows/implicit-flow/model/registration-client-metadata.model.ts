/**
 * Clients have metadata associated with their unique Client Identifier at the
 * Authorization Server. These can range from human-facing display strings, such
 * as a Client name, to items that impact the security of the protocol, such as
 * the list of valid redirect URIs.
 *
 * The Client Metadata values are used in two ways:
 * * as input values to registration requests, and
 * * as output values in registration responses and read responses.
 *
 * Human-readable Client Metadata values and Client Metadata values that
 * reference human-readable values may be represented in multiple languages and
 * scripts. For example, values such as client_name, tos_uri, policy_uri,
 * logo_uri, and client_uri might have multiple locale-specific values in some
 * Client registrations.
 *
 * To specify the languages and scripts, BCP47 [RFC5646] language tags are added
 * to Client Metadata member names, delimited by a # character. The same syntax
 * is used for representing languages and scripts for Client Metadata as is used
 * for Claims.
 *
 * If such a human-readable field is sent without a language tag, parties using
 * it won't make any assumptions about the language, character set, or script of
 * the string value, and the string value will be used as-is wherever it is
 * presented in a user interface. To facilitate interoperability, it is
 * recommended that any human-readable fields sent without language tags contain
 * values suitable for display on a wide variety of systems.
 */
export interface RegistrationClientMetadata {
  /**
   * Redirection URI values used by the Client. One of these registered
   * Redirection URI values MUST exactly match the redirect_uri parameter value
   * used in each Authorization Request, with the matching performed as
   * described in Section 6.2.1 of [RFC3986] (Simple String Comparison).
   */
  redirect_uris: string[];

  /**
   * the OAuth 2.0 response_type values that the Client is declaring that it
   * will restrict itself to using. If omitted, the default is that the Client
   * will use only the code Response Type.
   */
  response_types?: string[];

  /**
   * the OAuth 2.0 Grant Types that the Client is declaring that it will
   * restrict itself to using. The Grant Type values used by OpenID Connect are:
   * *  `authorization_code`: The Authorization Code Grant Type
   * *  `implicit`: The Implicit Grant Type.
   * *  `refresh_token`: The Refresh Token Grant Type.
   *
   * The following table lists the correspondence between response_type values
   *     that the Client will use and grant_type values that MUST be included in
   *     the registered grant_types list:
   * *  `code`: `authorization_code`
   * *  `id_token`: `implicit`
   * *  `token id_token`: `implicit`
   * *  `code id_token`: `authorization_code`, `implicit`
   * *  `code token`: `authorization_code`, `implicit`
   * *  `code token id_token`: `authorization_code`, `implicit`
   *
   *  If omitted, the default is that the Client will use only the
   *   `authorization_code` Grant Type.
   */
  grant_types?: string[];

  /**
   * Kind of the application. The default, if omitted, is `web`. The defined
   * values are `native` or `web`. Web Clients using the OAuth Implicit Grant
   * Type will only register URLs using the https scheme as redirect_uris. The
   * Authorization Server will verify that all the registered redirect_uris
   * conform to these constraints. This prevents sharing a Client ID across
   * different types of Clients.
   */
  application_type?: "web" | "native";

  /**
   * e-mail addresses of people responsible for this Client. This might be used
   * by some providers to enable a Web user interface to modify the Client
   * information.
   */
  contacts?: string[];

  /**
   * Name of the Client to be presented to the End-User. If desired,
   * representation of this Claim in different languages and scripts is
   * represented.
   */
  client_name?: string;

  /**
   * URL that references a logo for the Client application. If present, the
   * server SHOULD display this image to the End-User during approval. The value
   * of this field MUST point to a valid image file. If desired, representation
   * of this Claim in different languages and scripts is possible.
   */
  logo_uri?: string;

  /**
   * URL of the home page of the Client. The value of this field should point to a
   * valid Web page. If present, the server SHOULD display this URL to the
   * End-User in a followable fashion. If desired, representation of this Claim in
   * different languages and scripts is possible.
   */
  client_uri?: string;

  /**
   * URL that the Relying Party Client provides to the End-User to read about the
   * how the profile data will be used. The value of this field MUST point to a
   * valid web page. The OpenID Provider SHOULD display this URL to the End-User
   * if it is given. If desired, representation of this Claim in different
   * languages and scripts is possible.
   */
  policy_uri?: string;

  /**
   * URL that the Relying Party Client provides to the End-User to read about the
   * Relying Party's terms of service. The value of this field MUST point to a
   * valid web page. The OpenID Provider SHOULD display this URL to the End-User
   * if it is given. If desired, representation of this Claim in different
   * languages and scripts is possible.
   */
  tos_uri?: string;

  /**
   * URL for the Client's JSON Web Key Set [JWK] document. If the Client signs
   * requests to the Server, it contains the signing key(s) the Server uses to
   * validate signatures from the Client. The JWK Set MAY also contain the
   * Client's encryption keys(s), which are used by the Server to encrypt
   * responses to the Client. When both signing and encryption keys are made
   * available, a use (Key Use) parameter value is REQUIRED for all keys in the
   * referenced JWK Set to indicate each key's intended usage. Although some
   * algorithms allow the same key to be used for both signatures and encryption,
   * doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY
   * be used to provide X.509 representations of keys provided. When used, the
   * bare key values MUST still be present and MUST match those in the
   * certificate.
   */
  jwks_uri?: string;

  /**
   * Client's JSON Web Key Set [JWK] document, passed by value. The semantics of
   * the `jwks` parameter are the same as the `jwks_uri` parameter, other than
   * that the JWK Set is passed by value, rather than by reference. This
   * parameter is intended only to be used by Clients that, for some reason, are
   * unable to use the `jwks_uri` parameter, for instance, by native
   * applications that might not have a location to host the contents of the JWK
   * Set. If a Client can use `jwks_uri`, it will not use `jwks`. One
   * significant downside of jwks is that it does not enable key rotation (which
   * `jwks_uri` does. The `jwks_uri` and `jwks` parameters MUST NOT be used
   * together.
   */
  jwks?: string;

  /**
   * URL using the https scheme to be used in calculating Pseudonymous Identifiers
   * by the OP. The URL references a file with a single JSON array of redirect_uri
   * values. Please see Section 5. Providers that use pairwise sub (subject)
   * values SHOULD utilize the sector_identifier_uri value provided in the Subject
   * Identifier calculation for pairwise identifiers.
   */
  sector_identifier_uri?: string;

  /**
   * subject_type requested for responses to this Client. The
   * subject_types_supported Discovery parameter contains a list of the supported
   * subject_type values for this server. Valid types include pairwise and public.
   */
  subject_type?: string;

  /**
   * JWS alg algorithm [JWA] REQUIRED for signing the ID Token issued to this
   * Client. The value none MUST NOT be used as the ID Token alg value unless the
   * Client uses only Response Types that return no ID Token from the
   * Authorization Endpoint (such as when only using the Authorization Code Flow).
   * The default, if omitted, is RS256. The public key for validating the
   * signature is provided by retrieving the JWK Set referenced by the jwks_uri
   * element from OpenID Connect Discovery 1.0 [OpenID.Discovery].
   */
  id_token_signed_response_alg?: string;

  /**
   * JWE alg algorithm [JWA] REQUIRED for encrypting the ID Token issued to this
   * Client. If this is requested, the response will be signed then encrypted,
   * with the result being a Nested JWT, as defined in [JWT]. The default, if
   * omitted, is that no encryption is performed.
   */
  id_token_encrypted_response_alg?: string;

  /**
   * JWE enc algorithm [JWA] REQUIRED for encrypting the ID Token issued to this
   * Client. If id_token_encrypted_response_alg is specified, the default for this
   * value is A128CBC-HS256. When id_token_encrypted_response_enc is included,
   * id_token_encrypted_response_alg MUST also be provided.
   */
  id_token_encrypted_response_enc?: string;

  /**
   * JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is
   * specified, the response will be JWT [JWT] serialized, and signed using JWS.
   * The default, if omitted, is for the UserInfo Response to return the Claims as
   * a UTF-8 encoded JSON object using the application/json content-type.
   */
  userinfo_signed_response_alg?: string;

  /**
   * JWE [JWE] alg algorithm [JWA] REQUIRED for encrypting UserInfo Responses. If
   * both signing and encryption are requested, the response will be signed then
   * encrypted, with the result being a Nested JWT, as defined in [JWT]. The
   * default, if omitted, is that no encryption is performed.
   */
  userinfo_encrypted_response_alg?: string;

  /**
   * JWE enc algorithm [JWA] REQUIRED for encrypting UserInfo Responses. If
   * userinfo_encrypted_response_alg is specified, the default for this value is
   * A128CBC-HS256. When userinfo_encrypted_response_enc is included,
   * userinfo_encrypted_response_alg MUST also be provided.
   */
  userinfo_encrypted_response_enc?: string;

  /**
   * JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects
   * sent to the OP. All Request Objects from this Client MUST be rejected, if not
   * signed with this algorithm. Request Objects are described in Section 6.1 of
   * OpenID Connect Core 1.0 [OpenID.Core]. This algorithm MUST be used both when
   * the Request Object is passed by value (using the request parameter) and when
   * it is passed by reference (using the request_uri parameter). Servers SHOULD
   * support RS256. The value none MAY be used. The default, if omitted, is that
   * any algorithm supported by the OP and the RP MAY be used.
   */
  request_object_signing_alg?: string;

  /**
   * JWE [JWE] alg algorithm [JWA] the RP is declaring that it may use for
   * encrypting Request Objects sent to the OP. This parameter SHOULD be included
   * when symmetric encryption will be used, since this signals to the OP that a
   * client_secret value needs to be returned from which the symmetric key will be
   * derived, that might not otherwise be returned. The RP MAY still use other
   * supported encryption algorithms or send unencrypted Request Objects, even
   * when this parameter is present. If both signing and encryption are requested,
   * the Request Object will be signed then encrypted, with the result being a
   * Nested JWT, as defined in [JWT]. The default, if omitted, is that the RP is
   * not declaring whether it might encrypt any Request Objects.
   */
  request_object_encryption_alg?: string;

  /**
   * JWE enc algorithm [JWA] the RP is declaring that it may use for encrypting
   * Request Objects sent to the OP. If request_object_encryption_alg is
   * specified, the default for this value is A128CBC-HS256. When
   * request_object_encryption_enc is included, request_object_encryption_alg MUST
   * also be provided.
   */
  request_object_encryption_enc?: string;

  /**
   * Requested Client Authentication method for the Token Endpoint. The options
   * are client_secret_post, client_secret_basic, client_secret_jwt,
   * private_key_jwt, and none, as described in Section 9 of OpenID Connect Core
   * 1.0 [OpenID.Core]. Other authentication methods MAY be defined by extensions.
   * If omitted, the default is client_secret_basic -- the HTTP Basic
   * Authentication Scheme specified in Section 2.3.1 of OAuth 2.0 [RFC6749].
   */
  token_endpoint_auth_method?: string;

  /**
   * JWS [JWS] alg algorithm [JWA] that MUST be used for signing the JWT [JWT]
   * used to authenticate the Client at the Token Endpoint for the private_key_jwt
   * and client_secret_jwt authentication methods. All Token Requests using these
   * authentication methods from this Client MUST be rejected, if the JWT is not
   * signed with this algorithm. Servers SHOULD support RS256. The value none MUST
   * NOT be used. The default, if omitted, is that any algorithm supported by the
   * OP and the RP MAY be used.
   */
  token_endpoint_auth_signing_alg?: string;

  /**
   * Default Maximum Authentication Age. Specifies that the End-User MUST be
   * actively authenticated if the End-User was authenticated longer ago than the
   * specified number of seconds. The max_age request parameter overrides this
   * default value. If omitted, no default Maximum Authentication Age is
   * specified.
   */
  default_max_age?: string;

  /**
   * Boolean value specifying whether the auth_time Claim in the ID Token is
   * REQUIRED. It is REQUIRED when the value is true. (If this is false, the
   * auth_time Claim can still be dynamically requested as an individual Claim for
   * the ID Token using the claims request parameter described in Section 5.5.1 of
   * OpenID Connect Core 1.0 [OpenID.Core].) If omitted, the default value is
   * false.
   */
  require_auth_time?: string;

  /**
   * Default requested Authentication Context Class Reference values. Array of
   * strings that specifies the default acr values that the OP is being requested
   * to use for processing requests from this Client, with the values appearing in
   * order of preference. The Authentication Context Class satisfied by the
   * authentication performed is returned as the acr Claim Value in the issued ID
   * Token. The acr Claim is requested as a Voluntary Claim by this parameter. The
   * acr_values_supported discovery element contains a list of the supported acr
   * values supported by this server. Values specified in the acr_values request
   * parameter or an individual acr Claim request override these default values.
   */
  default_acr_values?: string;

  /**
   * URI using the https scheme that a third party can use to initiate a login by
   * the RP, as specified in Section 4 of OpenID Connect Core 1.0 [OpenID.Core].
   * The URI MUST accept requests via both GET and POST. The Client MUST
   * understand the login_hint and iss parameters and SHOULD support the
   * target_link_uri parameter.
   */
  initiate_login_uri?: string;

  /**
   * Array of request_uri values that are pre-registered by the RP for use at the
   * OP. Servers MAY cache the contents of the files referenced by these URIs and
   * not retrieve them at the time they are used in a request. OPs can require
   * that request_uri values used be pre-registered with the
   * require_request_uri_registration discovery parameter.
   * If the contents of the request file could ever change, these URI values
   * SHOULD include the base64url encoded SHA-256 hash value of the file contents
   * referenced by the URI as the value of the URI fragment. If the fragment value
   * used for a URI changes, that signals the server that its cached value for
   * that URI with the old fragment value is no longer valid.
   */
  request_uris?: string;
}
