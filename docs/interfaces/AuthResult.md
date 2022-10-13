[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / AuthResult

# Interface: AuthResult

https://openid.net/specs/openid-connect-implicit-1_0.html#ImplicitOK

If the End-User grants the access request, the Authorization Server issues an
Access Token and delivers it to the Client by adding the following parameters
to the fragment component of the Redirection URI using the
application/x-www-form-urlencoded format as defined in Section 4.2.2 of OAuth
2.0 [RFC6749] and OAuth 2.0 Multiple Response Type Encoding Practices
[OAuth.Responses].

In the Implicit Flow, the entire response is returned in the fragment
component of the Redirection URI, as defined in 4.2.2 of OAuth 2.0 [RFC6749].

## Table of contents

### Properties

- [access\_token](AuthResult.md#access_token)
- [expires](AuthResult.md#expires)
- [expires\_in](AuthResult.md#expires_in)
- [id\_token](AuthResult.md#id_token)
- [refresh\_token](AuthResult.md#refresh_token)
- [session\_upgrade\_token](AuthResult.md#session_upgrade_token)
- [state](AuthResult.md#state)
- [token\_type](AuthResult.md#token_type)

## Properties

### access\_token

• `Optional` **access\_token**: `string`

Access Token for the UserInfo Endpoint.

#### Defined in

[jwt/model/auth-result.model.ts:18](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L18)

___

### expires

• `Optional` **expires**: `number`

Expiry time of token

#### Defined in

[jwt/model/auth-result.model.ts:43](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L43)

___

### expires\_in

• `Optional` **expires\_in**: `string`

Expiration time of the Access Token in seconds since the response was
generated.

#### Defined in

[jwt/model/auth-result.model.ts:39](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L39)

___

### id\_token

• **id\_token**: `string`

ID Token

#### Defined in

[jwt/model/auth-result.model.ts:34](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L34)

___

### refresh\_token

• `Optional` **refresh\_token**: `string`

Only for code flow.

#### Defined in

[jwt/model/auth-result.model.ts:52](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L52)

___

### session\_upgrade\_token

• `Optional` **session\_upgrade\_token**: `string`

Session Upgrade token received from Authorisation

#### Defined in

[jwt/model/auth-result.model.ts:47](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L47)

___

### state

• **state**: `string`

OAuth 2.0 discoveryState value. REQUIRED if the discoveryState parameter is present in the
Authorization Request. Clients MUST verify that the discoveryState value is equal to
the value of discoveryState parameter in the Authorization Request.

#### Defined in

[jwt/model/auth-result.model.ts:30](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L30)

___

### token\_type

• `Optional` **token\_type**: ``"Bearer"``

REQUIRED. OAuth 2.0 Token Type value. The value MUST be Bearer, as
specified in OAuth 2.0 Bearer Token Usage [RFC6750], for Clients using this
subset. Note that the token_type value is case insensitive.

#### Defined in

[jwt/model/auth-result.model.ts:24](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/jwt/model/auth-result.model.ts#L24)
