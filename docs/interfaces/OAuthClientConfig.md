[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / OAuthClientConfig

# Interface: OAuthClientConfig

Config Object for OIDC Service

## Table of contents

### Properties

- [client\_id](OAuthClientConfig.md#client_id)
- [csrf\_token\_endpoint](OAuthClientConfig.md#csrf_token_endpoint)
- [debug](OAuthClientConfig.md#debug)
- [defaultAuthResultFilters](OAuthClientConfig.md#defaultauthresultfilters)
- [is\_session\_alive\_endpoint](OAuthClientConfig.md#is_session_alive_endpoint)
- [issuedAtMaxOffset](OAuthClientConfig.md#issuedatmaxoffset)
- [issuer](OAuthClientConfig.md#issuer)
- [login\_hint](OAuthClientConfig.md#login_hint)
- [post\_logout\_redirect\_uri](OAuthClientConfig.md#post_logout_redirect_uri)
- [redirect\_uri](OAuthClientConfig.md#redirect_uri)
- [response\_type](OAuthClientConfig.md#response_type)
- [scope](OAuthClientConfig.md#scope)
- [silent\_logout\_uri](OAuthClientConfig.md#silent_logout_uri)
- [silent\_refresh\_uri](OAuthClientConfig.md#silent_refresh_uri)
- [trusted\_audiences](OAuthClientConfig.md#trusted_audiences)
- [validate\_token\_endpoint](OAuthClientConfig.md#validate_token_endpoint)

## Properties

### client\_id

• **client\_id**: `string`

Set the ID of your client

#### Defined in

[configuration/model/config.model.ts:10](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L10)

___

### csrf\_token\_endpoint

• `Optional` **csrf\_token\_endpoint**: `string`

CSRF token endpoint

#### Defined in

[configuration/model/config.model.ts:47](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L47)

___

### debug

• `Optional` **debug**: `boolean`

Verbose logging of inner workings of the package.

#### Defined in

[configuration/model/config.model.ts:62](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L62)

___

### defaultAuthResultFilters

• `Optional` **defaultAuthResultFilters**: [`AuthResultFilter`](AuthResultFilter.md)[]

A list of filters each auth result must adhere to.

#### Defined in

[configuration/model/config.model.ts:84](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L84)

___

### is\_session\_alive\_endpoint

• `Optional` **is\_session\_alive\_endpoint**: `string`

Endpoint for checking if a session is still used somewhere

#### Defined in

[configuration/model/config.model.ts:57](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L57)

___

### issuedAtMaxOffset

• `Optional` **issuedAtMaxOffset**: `number`

The maximum time to pass between the issuance and consumption of an
authentication result.

#### Defined in

[configuration/model/config.model.ts:74](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L74)

___

### issuer

• **issuer**: `string`

The base issuer URL.

#### Defined in

[configuration/model/config.model.ts:79](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L79)

___

### login\_hint

• `Optional` **login\_hint**: `string`

Hint to the Authorization Server about the login identifier the End-User
might use to log in (if necessary). This hint can be used by a Relying
Party (RP) if it first asks the End-User for their e-mail address (or other
identifier) and then wants to pass that value as a hint to the discovered
authorization service. It is RECOMMENDED that the hint value match the
value used for discovery. This value MAY also be a phone number in the
format specified for the `phone_number` Claim. The use of this parameter is
left to the OpenID Provider's discretion.

#### Defined in

[configuration/model/config.model.ts:96](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L96)

___

### post\_logout\_redirect\_uri

• `Optional` **post\_logout\_redirect\_uri**: `string`

The URL you want to be redirected to after logging out

#### Defined in

[configuration/model/config.model.ts:36](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L36)

___

### redirect\_uri

• **redirect\_uri**: `string`

The URL you want to be redirected to after redirect from Authorization

#### Defined in

[configuration/model/config.model.ts:21](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L21)

___

### response\_type

• **response\_type**: ``"id_token"`` \| ``"id_token token"`` \| ``"code"``

What type of token(s) you wish to receive
In case op Open Id Connect this is usually `token id_token`

#### Defined in

[configuration/model/config.model.ts:16](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L16)

___

### scope

• **scope**: `string`

Define the scopes you want access to. Each scope is separated by space.
When using Open Id Connect, scope `openid` is mandatory

#### Defined in

[configuration/model/config.model.ts:42](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L42)

___

### silent\_logout\_uri

• `Optional` **silent\_logout\_uri**: `string`

The URL you want to use for a silent Logout, if your stack supports it.

#### Defined in

[configuration/model/config.model.ts:31](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L31)

___

### silent\_refresh\_uri

• `Optional` **silent\_refresh\_uri**: `string`

The URL you want to be redirected to after redirect from Authorization, while doing a silent access token refresh

#### Defined in

[configuration/model/config.model.ts:26](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L26)

___

### trusted\_audiences

• `Optional` **trusted\_audiences**: `string`[]

Audiences (client_ids) other than the current client which are allowed in
the audiences claim.

#### Defined in

[configuration/model/config.model.ts:68](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L68)

___

### validate\_token\_endpoint

• `Optional` **validate\_token\_endpoint**: `string`

Validate received token endpoint

#### Defined in

[configuration/model/config.model.ts:52](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/configuration/model/config.model.ts#L52)
