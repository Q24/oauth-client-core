[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / LogUtil

# Class: LogUtil

## Table of contents

### Constructors

- [constructor](LogUtil.md#constructor)

### Methods

- [debug](LogUtil.md#debug)
- [emitLog](LogUtil.md#emitlog)
- [error](LogUtil.md#error)
- [info](LogUtil.md#info)
- [warn](LogUtil.md#warn)

## Constructors

### constructor

• **new LogUtil**()

## Methods

### debug

▸ `Static` **debug**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:4](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/log-util.ts#L4)

___

### emitLog

▸ `Static` `Private` **emitLog**(`logType`, `msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logType` | ``"log"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:20](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/log-util.ts#L20)

___

### error

▸ `Static` **error**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:16](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/log-util.ts#L16)

___

### info

▸ `Static` **info**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:8](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/log-util.ts#L8)

___

### warn

▸ `Static` **warn**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:12](https://github.com/Q24/oauth-client/blob/ba3a05b/packages/oauth-client-core/src/utils/log-util.ts#L12)
