[use-relay-mock-environment](README.md) / Modules

# use-relay-mock-environment

## Table of contents

### Type aliases

- [RelayMockData](modules.md#relaymockdata)
- [RelayMockDataField](modules.md#relaymockdatafield)
- [RelayMockGlobalOptions](modules.md#relaymockglobaloptions)
- [RelayMockOptions](modules.md#relaymockoptions)

### Functions

- [RelayEnvironmentProvider](modules.md#relayenvironmentprovider)
- [createRelayMockEnvironmentHook](modules.md#createrelaymockenvironmenthook)

## Type aliases

### RelayMockData

Ƭ **RelayMockData**: `Object`

An object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below).

First specify the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example:
```js
const mockData = {
  users: {
    firstName: {
      mockType: 'faker.name.firstName'
    }
  }
}
```

#### Index signature

▪ [parentTypeName: `string`]: { [fieldName: string]: [`RelayMockDataField`](modules.md#relaymockdatafield);  }

#### Defined in

[src/index.ts:100](https://github.com/richardguerre/use-relay-mock-environment/blob/9aa610b/src/index.ts#L100)

___

### RelayMockDataField

Ƭ **RelayMockDataField**: `Object`

An object to describe how to override the guessed type/category by use-relay-mock-environment.

You can specify one or more of the following:
- mockPath
- mockParentTypeName
- mockType
- mockValues
- mockDescription
- mockNull
- mockUndefined

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `mockDescription?` | `string` | (optional) describe what type/category the field is. This mockDescription goes through the same fuzzy search that the field name goes through. |
| `mockNull?` | `boolean` | (optional) a boolean to specify whether the value should resolve to null. |
| `mockPath?` | `string` | (optional) path taken by the query (not fragment) to get to the field. Example: ``` query {   usersConnection {     edges {       node {         firstName       }     }   } } ``` In this case, the path of field `firstName` is `"usersConnection.edges.node.firstName"`. |
| `mockType?` | `FakerPath` | type/category of the field. Only faker types are supported for now. Example:  Setting mockType to `faker.random.word` will result in generating a random word. |
| `mockUndefined?` | `boolean` | (optional) a boolean to specify whether the value should resolve to undefined. |
| `mockValues?` | `any`[] | (optional) an array of possible values to randomly select from. Example:  Setting mockValues to `['hello', 'world', 3, true, false]`, the generator will randomly select out of those values.  If you want to add weight to one value, you can use the `Array(3).fill(yourValue)`. Example: ``` "fieldName": {   mockValues: [Array(3).fill('hello'), 'world', 3, true, false] } ``` `'hello'` is 3x more likely to be selected. |

#### Defined in

[src/index.ts:29](https://github.com/richardguerre/use-relay-mock-environment/blob/9aa610b/src/index.ts#L29)

___

### RelayMockGlobalOptions

Ƭ **RelayMockGlobalOptions**: [`RelayMockOptions`](modules.md#relaymockoptions) & { `forceInstantInitialLoading?`: `boolean` ; `fuseOptions?`: `FuseTypes.IFuseOptions`<`any`\>  }

Same as the `RelayMockOptions` below.

#### Defined in

[src/index.ts:242](https://github.com/richardguerre/use-relay-mock-environment/blob/9aa610b/src/index.ts#L242)

___

### RelayMockOptions

Ƭ **RelayMockOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `customResolvers?` | `MockResolvers` | (optional) custom resolvers that are spread after use-relay-mock-environment's `ID` and `String` resolvers. ``` const resolvers = {   ID() {...},   String() {...},   // your custom resolvers go here } ``` You can of course override the default `ID` and `String` resolvers by specifying your own.  Read more about custom resolvers here: https://relay.dev/docs/guides/testing-relay-components/#mock-payload-generator-and-the-relay_test_operation-directive |
| `data?` | [`RelayMockData`](modules.md#relaymockdata) | (optional) an object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below).  First specify the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example: ```js const mockData = {   users: {     firstName: {       mockType: 'faker.name.firstName'     }   } } ``` |
| `debug?` | `boolean` | Enables debug logs. Useful to get the `parentType` of a field to resolve. |
| `extendStringResolver?` | `MockResolver` | (optional) a function to extend use-relay-mock-environment's `String` resolver. If `relay-mock-default` is returned, then it will continue with the default mock resolvers using FakerJS.  **`param`** `context` is the mock resolver context (read more about it here: https://relay.dev/docs/guides/testing-relay-components/#mock-resolver-context)  **`param`** `generateId` is a function to generate a globally unique ID. |
| `forceLoading?` | `boolean` | (optional) Whether to force loading and don't resolve any GraphQL operation. |
| `generatorOptions?` | `MockPayloadGeneratorOptions` | (optional) mock generator options. Please read documentation of type MockPayLoadGeneratorOptions. |
| `instantInitialLoading?` | `boolean` | (optional) Whether to instantly load the GraphQL operation. By default there is a 300ms loading time to mimick real-world network conditions.  This only applies to the initial loading. If you would like to change the loading time, set `loadTime` instead. |
| `loadTime?` | `number` | (optional) Loading time in miliseconds for each GraphQL operations. Default is 300ms as to mimick real-world network conditions. |
| `searchTypeByName?` | `string` | (optional) string input to find the full context (including the parentType) of fields that match that name. Example:  Given the following query: ```graphql query {   usersConnection {     edges {       node {         firstName       }     }   } } ``` To find the context of `firstName`, you simply add the following to your `options`: ```json {   "searchTypeByName": "firstName",   // ... } ```  Use `searchTypeByPath` for more specific results. |
| `searchTypeByPath?` | `string` | (optional) string input to find the full context (including the parentType) of fields for which the path ends with that string input.  Given the following query: ```graphql query {   usersConnection {     edges {       node {         firstName       }     }   } } ``` To find the context of `firstName`, you simply add the following to your `options`: ```json {   "searchTypeByName": "usersConnection.edges.node.firstName",   // ... } ``` `edges.node.firstName`, `node.firstName` and `firstName` would also be valid inputs. |
| `seed?` | `number` \| `string` | (optional) a number or string used to seed the random generators to get consistent fake data. Useful when doing tests like Jest Snapshots or Visual Regression Tests within Chromatic.  If a number is passed in, it directly runs `faker.seed(n)` with `n` being the number that you specify. If a string is passed in, it first converts the string into a hashCode number (like Java's String.hashCode()), and then runs `faker.seed(n)`, where `n` is the hashCode number.  Providing `seed` will override property `generatorOptions.randomLengthArray` to false, and will set `geneartorOptions.arrayLength` to 3, unless specified. |

#### Defined in

[src/index.ts:106](https://github.com/richardguerre/use-relay-mock-environment/blob/9aa610b/src/index.ts#L106)

## Functions

### RelayEnvironmentProvider

▸ **RelayEnvironmentProvider**(`props`): `ReactElement`<`ProviderProps`<`RelayContext`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Props` |

#### Returns

`ReactElement`<`ProviderProps`<`RelayContext`\>\>

#### Defined in

node_modules/@types/react-relay/relay-hooks/RelayEnvironmentProvider.react.d.ts:9

___

### createRelayMockEnvironmentHook

▸ **createRelayMockEnvironmentHook**(`globalOptions?`): (`options?`: [`RelayMockOptions`](modules.md#relaymockoptions)) => `RelayMockEnvironment`

The function to create the `useRelayMockEnvironment()` hook.

This is where the global options and FuseJS (used for fuzzy searching) are initialized.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `globalOptions?` | [`RelayMockGlobalOptions`](modules.md#relaymockglobaloptions) | options to be applied to all instances of useRelayMockEnvironment hook. Read more about the global options above. |

#### Returns

`fn`

a function that is the `useRelayMockEnvironment()` React hook. Read more about its `options` above, in RelayMockOptions.

▸ (`options?`): `RelayMockEnvironment`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`RelayMockOptions`](modules.md#relaymockoptions) |

##### Returns

`RelayMockEnvironment`

#### Defined in

[src/index.ts:264](https://github.com/richardguerre/use-relay-mock-environment/blob/9aa610b/src/index.ts#L264)
