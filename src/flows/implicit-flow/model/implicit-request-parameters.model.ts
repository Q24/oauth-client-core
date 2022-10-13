import type { RegistrationClientMetadata } from "./registration-client-metadata.model";

export interface OpenIdImplicitAuthorizationParameters {
  /**
   * What type of token(s) you wish to receive This value consists of `id_token`
   * and `token`, as a space-delimited list. This requests that both an Access
   * Token and an ID Token be returned from the Authorization Endpoint, as
   * specified in OAuth 2.0 Multiple Response Type Encoding Practices
   * [OAuth.Responses].
   */
   response_type: "id_token" | "id_token token";

   /**
    * OAuth 2.0 Client Identifier valid at the Authorization Server.
    */
   client_id: string;

   /**
    * Define the scopes you want to add to your session. Multiple scopes will be
    * added in a single strings, separated by spaces. OpenID Connect requests
    * must contain the `openid` scope value.
    *
    * OpenID Connect defines the following optional scope values:
    * * `profile`: This scope value requests access to the End-User's default
    *   profile Claims, which are: name, family_name, given_name, middle_name,
    *   nickname, preferred_username, profile, picture, website, gender,
    *   birthdate, zoneinfo, locale, and updated_at.
    * * `email`: This scope value requests access to the email and email_verified
    *   Claims.
    * * `address`: This scope value requests access to the address Claim.
    * * `phone`: This scope value requests access to the phone_number and
    *   phone_number_verified Claims.
    * * `offline_access`: This scope value requests that an OAuth 2.0 Refresh
    *   Token be issued that can be used to obtain an Access Token that grants
    *   access to the End-User's userinfo_endpoint even when the End-User is not
    *   present (not logged in).
    */
   scope: "openid" | string;

   /**
    * The URL you want to be redirected to after redirect from Authorisation
    */
   redirect_uri: string;

   /**
    * Opaque value used to maintain discoveryState between the request and the callback.
    */
   state: string;

   /**
    * used to associate a Client session with an ID Token, and to mitigate replay
    * attacks. The value is passed through unmodified from the Authentication
    * Request to the ID Token.
    */
   nonce: string;

   /**
    * specifies how the Authorization Server displays the authentication and
    * consent user interface pages to the End-User. The defined values are:
    * * `page`: a full User Agent page view. If the display parameter is not
    *   specified, this is the default display mode.
    * * `popup`: a popup User Agent window. The popup User Agent window should be
    *   of an appropriate size for a login-focused dialog and should not obscure
    *   the entire window that it is popping up over.
    * * `touch`: a device that leverages a touch interface.
    * * `wap`: a "feature phone" type display.
    *
    * The Authorization Server may also attempt to detect the capabilities of the
    * User Agent and present an appropriate display.
    */
   display?: "page" | "popup" | "touch" | "wap";

   /**
    * specifies whether the Authorization Server prompts the End-User for
    * reauthentication and consent. The defined values are:
    * * `none`: The Authorization Server won't display any authentication or
    *   consent user interface pages. An error is returned if an End-User is not
    *   already authenticated or the Client does not have pre-configured consent
    *   for the requested Claims or does not fulfill other conditions for
    *   processing the request. The error code will typically be `login_required`
    *   or `interaction_required`. This can be used as a method to check for
    *   existing authentication and/or consent.
    * * `login`: prompt the End-User for reauthentication. If it cannot
    *   reauthenticate the End-User, it will return an error, typically
    *   `login_required`.
    * * `consent`: prompt the End-User for consent before returning information
    *   to the Client. If it cannot obtain consent, it will return an error,
    *   typically `consent_required`.
    * * `select_account`: prompt the End-User to select a user account. This
    *   enables an End-User who has multiple accounts at the Authorization Server
    *   to select amongst the multiple accounts that they might have current
    *   sessions for. If it cannot obtain an account selection choice made by the
    *   End-User, it will return an error, typically
    *   `account_selection_required`.
    *
    * The prompt parameter can be used by the Client to make sure that the
    * End-User is still present for the current session or to bring attention to
    * the request. If this parameter contains none with any other value, an error
    * is returned.
    */
   prompt?: "none" | "login" | "consent" | "select_account";

   /**
    * Maximum Authentication Age. Specifies the allowable elapsed time in seconds
    * since the last time the End-User was actively authenticated by the OpenID
    * Provider (OP). If the elapsed time is greater than this value, the OP will
    * attempt to actively re-authenticate the End-User. When max_age is used, the
    * ID Token returned will include an auth_time Claim Value. Note that
    * max_age=0 is equivalent to prompt=login.
    */
   max_age?: number;

   /**
    * End-User's preferred languages and scripts for the user interface,
    * represented as a space-separated list of BCP47 language tag values, ordered
    * by preference. For instance, the value "fr-CA fr en" represents a
    * preference for French as spoken in Canada, then French (without a region
    * designation), followed by English (without a region designation). No error
    * will be thrown if none of the requested locales are supported by the OpenID
    * Provider.
    */
   ui_locales?: string;

   /**
    * End-User's preferred languages and scripts for Claims being returned,
    * represented as a space-separated list of BCP47 language tag values, ordered
    * by preference. No error will be thrown if none of the requested locales are
    * supported by the OpenID Provider.
    */
   claims_locales?: string;

   /**
    * ID Token previously issued by the Authorization Server being passed as a
    * hint about the End-User's current or past authenticated session with the
    * Client. If the End-User identified by the ID Token is logged in or is
    * logged in by the request, then the Authorization Server returns a positive
    * response; otherwise, it will return an error.
    *
    * An id_token_hint will be present when `prompt=none` is used and an
    * `invalid_request` error may be returned if it is not; however, the server
    * will respond successfully when possible, even if it is not present. The
    * Authorization Server need not be listed as an audience of the ID Token when
    * it is used as an id_token_hint value.
    */
   id_token_hint?: string;

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

   /**
    * Requested Authentication Context Class Reference values. Space-separated
    * string that specifies the acr values that the Authorization Server is being
    * requested to use for processing this authentication request, with the
    * values appearing in order of preference. The Authentication Context Class
    * satisfied by the authentication performed is returned as the acr Claim
    * Value. The acr Claim is requested as a Voluntary Claim by this parameter.
    */
   acr_values?: string;

   /**
    * This parameter is used by the Client to provide information about itself to
    * a Self-Issued OpenID Providers (OP) that would normally be provided to an
    * OP during Dynamic Client Registration.
    *
    * The value is a JSON object containing Client metadata values. The
    * registration parameter won't be used when the OP is not a Self-Issued OP.
    */
   registration?: RegistrationClientMetadata;
}
