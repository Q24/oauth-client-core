[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / CsrfResult

# Interface: CsrfResult

Session bound token. This token remain the same during your HTTP session (exception: changes once after successful login).

## Table of contents

### Properties

- [csrf\_token](CsrfResult.md#csrf_token)
- [header\_name](CsrfResult.md#header_name)
- [parameter\_key](CsrfResult.md#parameter_key)

## Properties

### csrf\_token

• **csrf\_token**: `string`

The CSRF Token itself

#### Defined in

[csrf/csrf.model.ts:16](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/csrf/csrf.model.ts#L16)

___

### header\_name

• **header\_name**: `string`

CSRF Token Header name

#### Defined in

[csrf/csrf.model.ts:8](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/csrf/csrf.model.ts#L8)

___

### parameter\_key

• **parameter\_key**: `string`

CRSF Token key to be used

#### Defined in

[csrf/csrf.model.ts:12](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/csrf/csrf.model.ts#L12)
