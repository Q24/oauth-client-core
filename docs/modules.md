[@ilionx/oauth-client-core](README.md) / Exports

# @ilionx/oauth-client-core

## Table of contents

### Classes

- [LogUtil](classes/LogUtil.md)

### Interfaces

- [AuthResult](interfaces/AuthResult.md)
- [AuthResultFilter](interfaces/AuthResultFilter.md)
- [CsrfResult](interfaces/CsrfResult.md)
- [JWT](interfaces/JWT.md)
- [OAuthClientConfig](interfaces/OAuthClientConfig.md)

### Type aliases

- [AuthorizeErrors](modules.md#authorizeerrors)

### Variables

- [config](modules.md#config)

### Functions

- [accessTokenScopeFilter](modules.md#accesstokenscopefilter)
- [cleanHashFragment](modules.md#cleanhashfragment)
- [cleanSessionStorage](modules.md#cleansessionstorage)
- [configure](modules.md#configure)
- [deleteStoredAuthResults](modules.md#deletestoredauthresults)
- [discovery](modules.md#discovery)
- [getAuthHeader](modules.md#getauthheader)
- [getCsrfResult](modules.md#getcsrfresult)
- [getIdTokenHint](modules.md#getidtokenhint)
- [getStoredAuthResult](modules.md#getstoredauthresult)
- [getStoredCsrfToken](modules.md#getstoredcsrftoken)
- [getUserInfo](modules.md#getuserinfo)
- [isSessionAlive](modules.md#issessionalive)
- [lazyRefresh](modules.md#lazyrefresh)
- [obtainSession](modules.md#obtainsession)
- [parseIdToken](modules.md#parseidtoken)
- [parseJwt](modules.md#parsejwt)
- [silentLogout](modules.md#silentlogout)

## Type aliases

### AuthorizeErrors

Ƭ **AuthorizeErrors**: ``"invalid_client"`` \| ``"unauthorized_client"`` \| ``"invalid_grant"`` \| ``"unsupported_grant_type"`` \| ``"invalid_scope"`` \| ``"invalid_request_response_type"`` \| ``"invalid_request_type"`` \| ``"invalid_request_openid_type"`` \| ``"invalid_request_redirect_uri"`` \| ``"invalid_request_signature"`` \| ``"invalid_request_realm"`` \| ``"invalid_request_atype"`` \| ``"invalid_request_recipient"``

A set of strings to match when the Authorize redirect is erroring. This is the complete list of possible error to handle.
https://openid.net/specs/openid-connect-core-1_0.html#AuthError

#### Defined in

[authentication/model/authorize-errors.model.ts:5](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/model/authorize-errors.model.ts#L5)

## Variables

### config

• `Let` **config**: [`OAuthClientConfig`](interfaces/OAuthClientConfig.md)

#### Defined in

[configuration/config.service.ts:3](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/config.service.ts#L3)

## Functions

### accessTokenScopeFilter

▸ **accessTokenScopeFilter**(`scopes`): [`AuthResultFilter`](interfaces/AuthResultFilter.md)

check if the access token has the required scopes. The access token must be a
JWT token with a scope parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopes` | `string`[] | the scopes to check for |

#### Returns

[`AuthResultFilter`](interfaces/AuthResultFilter.md)

an AuthResultFilter function

#### Defined in

[auth-result-filter/access-token-scope-filter.ts:13](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/auth-result-filter/access-token-scope-filter.ts#L13)

___

### cleanHashFragment

▸ **cleanHashFragment**(`url`): `string`

Based on a URL containing a hash fragment, gets a new URL without this fragment.

Useful if the URL contains a hash fragment which should be stripped. URL could contain
an *access_token* when a user uses the *BACK* button in the browser.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the URL containing the hash fragment |

#### Returns

`string`

the URL without the hash fragment

#### Defined in

[utils/url.ts:84](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/url.ts#L84)

___

### cleanSessionStorage

▸ **cleanSessionStorage**(): `void`

Cleans up the current session: deletes the stored local tokens, discoveryState, nonce,
id token hint, CSRF token, json web key set, id provider metadata, user info,
refresh token

#### Returns

`void`

#### Defined in

[utils/clean-session-storage.ts:16](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/clean-session-storage.ts#L16)

___

### configure

▸ **configure**(`configuration`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration` | (`configuration`: [`OAuthClientConfig`](interfaces/OAuthClientConfig.md)) => [`OAuthClientConfig`](interfaces/OAuthClientConfig.md) \| [`OAuthClientConfig`](interfaces/OAuthClientConfig.md) |

#### Returns

`void`

#### Defined in

[configuration/config.service.ts:5](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/config.service.ts#L5)

___

### deleteStoredAuthResults

▸ **deleteStoredAuthResults**(`authResultFilter?`): `void`

Deletes all the auth results from the storage. If authResultFilter is passed
in, only a subset will be deleted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authResultFilter?` | (`authResult`: `Readonly`<[`AuthResult`](interfaces/AuthResult.md)\>) => `boolean` | if specified, the authResultFilter is called for every auth result in the store. If a authResultFilter callback returns true, the auth result will remain in the store. Otherwise, it will be deleted (Just like Array.prototype.filter()) |

#### Returns

`void`

#### Defined in

[authentication/auth-result.ts:22](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/auth-result.ts#L22)

___

### discovery

▸ **discovery**(): `Promise`<`void`\>

Used for obtaining OpenID Provider configuration information. The discovery
will only be done once. Further calls to the discovery endpoint will result
in a singleton promise being returned.

Discovery will automatically be done by the checkSession method.

#### Returns

`Promise`<`void`\>

A promise which will resolve when the discovery is complete

#### Defined in

[discovery/discovery.ts:24](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/discovery/discovery.ts#L24)

___

### getAuthHeader

▸ **getAuthHeader**(`authResult`): `string`

Get the Authorization header for usage with rest calls.

Uses the token type present in the token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authResult` | [`AuthResult`](interfaces/AuthResult.md) |

#### Returns

`string`

#### Defined in

[authentication/auth-header.ts:8](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/auth-header.ts#L8)

___

### getCsrfResult

▸ **getCsrfResult**(): `Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

Get a CSRF Token from the authorization server

#### Returns

`Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

#### Defined in

[csrf/csrf.ts:34](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/csrf/csrf.ts#L34)

___

### getIdTokenHint

▸ **getIdTokenHint**(`options?`): `string` \| ``null``

Get the saved id_token_hint string for the current instance from storage
Used when you need to check the if your logged in or not without using access-tokens as a reference

Pass the `{regex: true}` option, to search for any ID Token Hint by regex
During logout, the regex option should be enabled if we are not sure that the *client_id* will remain stable.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.regex` | `boolean` | `false` |

#### Returns

`string` \| ``null``

#### Defined in

[open-id/id-token-hint.ts:15](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/open-id/id-token-hint.ts#L15)

___

### getStoredAuthResult

▸ **getStoredAuthResult**(`extraAuthResultFilters?`): [`AuthResult`](interfaces/AuthResult.md) \| ``null``

Gets a valid, non-expired token from session storage given a set of validators.

#### Parameters

| Name | Type |
| :------ | :------ |
| `extraAuthResultFilters?` | [`AuthResultFilter`](interfaces/AuthResultFilter.md)[] |

#### Returns

[`AuthResult`](interfaces/AuthResult.md) \| ``null``

A valid Token or `null` if no token has been found.

#### Defined in

[authentication/auth-result.ts:90](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/auth-result.ts#L90)

___

### getStoredCsrfToken

▸ **getStoredCsrfToken**(): `string` \| ``null``

Gets the stored CSRF Token from storage

#### Returns

`string` \| ``null``

#### Defined in

[csrf/csrf.ts:18](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/csrf/csrf.ts#L18)

___

### getUserInfo

▸ **getUserInfo**(): `Promise`<`UserInfo`\>

tries to get the local user info; if not found, get the remote user info.

#### Returns

`Promise`<`UserInfo`\>

the user info

#### Defined in

[user-info/user-info.ts:126](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/user-info/user-info.ts#L126)

___

### isSessionAlive

▸ **isSessionAlive**(): `Promise`<`Object`\>

Checks if a session is alive. This may be on another platform.
This is normally used in conjunction with a silent logout. It
doesn't extend the lifetime of the current session. If a
session is found, a logout should NOT be triggered.

#### Returns

`Promise`<`Object`\>

The status code of the HTTP response

#### Defined in

[backend-check/session-alive.ts:13](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/backend-check/session-alive.ts#L13)

___

### lazyRefresh

▸ **lazyRefresh**(`authResult`, `tokenValidationOptions?`): `Promise`<`boolean`\>

Check if the token expires in the next *x* seconds.

If this is the case, a silent refresh will be triggered and the Promise will
resolve to `true`.

If the token does not expire within *x* seconds, the Promise will resolve to
`false` instead.

**`throws`** May throw an error if the token we got from the refresh is not valid,
or if the refresh did not succeed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authResult` | [`AuthResult`](interfaces/AuthResult.md) | the token to check |
| `tokenValidationOptions?` | `AuthValidationOptions` & { `almostExpiredThreshold?`: `number`  } | extra validations for the token |

#### Returns

`Promise`<`boolean`\>

A promise.

#### Defined in

[authentication/lazy-refresh.ts:24](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/lazy-refresh.ts#L24)

___

### obtainSession

▸ **obtainSession**(`authValidationOptions?`): `Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authValidationOptions?` | `AuthValidationOptions` |

#### Returns

`Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Defined in

[authentication/obtain-session.ts:8](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/obtain-session.ts#L8)

___

### parseIdToken

▸ `Const` **parseIdToken**(`token`): [`JWT`](interfaces/JWT.md)<`IdTokenPayload`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`JWT`](interfaces/JWT.md)<`IdTokenPayload`\>

#### Defined in

[jwt/parseJwt.ts:46](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/parseJwt.ts#L46)

___

### parseJwt

▸ **parseJwt**<`T`\>(`token`): [`JWT`](interfaces/JWT.md)<`T`\>

transforms an JWT string (e.g. from an access token) to a
JWT object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `AccessTokenPayload` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | A JWT token string |

#### Returns

[`JWT`](interfaces/JWT.md)<`T`\>

JSON Web Token

#### Defined in

[jwt/parseJwt.ts:28](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/parseJwt.ts#L28)

___

### silentLogout

▸ **silentLogout**(`silentLogoutConfig?`): `Promise`<`void`\>

Allows you to initiate a logout of the session in the background via an
iframe.

This logout will not redirect the top-level window to the logged-out page.
It is important that the result of the returning Promise is used to take
an action (e.g. do a redirect to the logout page).

The logout was successful if the iframe ended up on the configured
`post_logout_redirect_uri`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `silentLogoutConfig?` | `SilentLogoutConfig` |

#### Returns

`Promise`<`void`\>

The promise resolves if the logout was successful, otherwise it will reject.

#### Defined in

[authentication/silent-logout.ts:34](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/authentication/silent-logout.ts#L34)
