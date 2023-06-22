use-relay-mock-environment / [Modules](modules.md)

# use-relay-mock-environment

Next-level auto mocking for Relay components. Minimal code required.

Instead of having to specify resolvers for each individual field or going with the default (i.e. `<mock-value-1>`), this hook will automatically guess what type/category each field is and will use [faker.js](https://www.npmjs.com/package/faker) to generate fake data for you. Letting you focus on what matters most, which is building great UI/UX.

[![Version](https://img.shields.io/npm/v/use-relay-mock-environment.svg)](https://npmjs.org/package/use-relay-mock-environment)
[![Downloads/week](https://img.shields.io/npm/dw/use-relay-mock-environment.svg)](https://npmjs.org/package/use-relay-mock-environment)
[![License](https://img.shields.io/npm/l/use-relay-mock-environment.svg)](https://github.com/richardguerre/use-relay-mock-environment/blob/master/package.json)

## Installation
Install the library and relay-test-utils. Make sure you use the relay-test-utils version corresponding to your react-relay.

```
yarn add -D use-relay-mock-environment relay-test-utils
```
OR
```
npm i --save-dev use-relay-mock-environment relay-test-utils
```

## How does it work?

The hook does three main things:

1. Tries to guess which type/category each individual field is, using [fuse.js](https://fusejs.io/) to search through a dictionary of keywords mapping to types. Example: `fieldName: "sirname"` -> `type: "faker.name.lastName"`.
2. Using the above guessed type, it generates fake data for that field, using [faker.js](https://www.npmjs.com/package/faker). Example: `guessedType: "faker.name.lastName"` -> `fakeData: "Doe"`.
3. Calls `environment.mock.resolveMostRecentOperation()`, from [relay-test-utils](https://github.com/facebook/relay/tree/main/packages/relay-test-utils), on a interval (300ms by default) to resolve all operations (not just the first Query/Mutation/Subscription) and create mock data from the relay-compiled GraphQL. It is slightly modified to have more contentful mock data (e.g. length of arrays that match with your limit parameters - example: `first: 10` --> `Array(10)`, or random length arrays).

### What if the guessed type/category is wrong?

If the hook guesses the wrong type for a field, you can override it by providing `data` in the options of `createRelayMockEnvironmentHook(options)` (global level) or `useRelayMockEnvironment(options)` (component specific level):

```js
const useRelayMockEnvironment = createRelayMockEnvironmentHook({
  data: {
    [fieldName]: {
      mockType: 'faker.random.word',
    },
  },
});

// OR

const environment = useRelayMockEnvironment({
  data: {
    [fieldName]: {
      mockType: 'faker.random.word',
    },
  },
});
```

You can read more about `data overrides` [here](https://github.com/richardguerre/use-relay-mock-environment/blob/master/docs/modules.md#relaymockdata).

# Examples

## Base

For any environment (Storybook, Cypress, dummy page, etc.), you will first need to create the `useRelayMockEnvironment` hook using `createRelayMockEnvironmentHook()` and passing in your global options

```jsx
// useRelayMockEnvironment.(js | jsx | ts | tsx)
import { createRelayMockEnvironmentHook } from 'use-relay-mock-environment';

const useRelayMockEnvironment = createRelayMockEnvironmentHook({
  // Add global options here (optional)
});

export default useRelayMockEnvironment;
```

## Storybook

```jsx
// MyComponent.stories.(js | jsx | ts | tsx)
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import useRelayMockEnvironment from './path/to/useRelayMockEnvironment';
import MyComponent from './MyComponentQuery';

export default {
  title: 'MyComponent',
  component: MyComponent,
};

export const Default = () => {
  const environment = useRelayMockEnvironment({
    // Add story specific options here (optional)
  });

  return (
    <RelayEnvironmentProvider environment={environment}>
      <MyComponent />
    </RelayEnvironmentProvider>
  );
};
```

## Chromatic

When using a visual testing tool like Chromatic, you can enforce having consistent fake data by providing the `seed`, `instantInitialLoading` and/or `forceInstantInitialLoading` options. We recommend passing these options at the global level, when invoking `createRelayMockEnvironmentHook()`:

```js
// useRelayMockEnvironment.(js | jsx | ts | tsx)
import { createRelayMockEnvironmentHook } from 'use-relay-mock-environment';
import isChromatic from 'chromatic/isChromatic';

const useRelayMockEnvironment = createRelayMockEnvironmentHook({
  ...(isChromatic()
    ? {
        seed: 123, // can be anything you want (string or number)
        forceInstantInitialLoading: true,
      }
    : {}),
  // Add any other global options here (optional)
});

export default useRelayMockEnvironment;
```

With the above you don't have to add any additional options when invoking the `useRelayMockEnvironment` hook.

# Options

You can specify the following `options` in `createRelayMockEnvironmentHook(options)` (global level) or `useRelayMockEnvironment(options)` (component specific level):

| Name                     | Type                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :----------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customResolvers?`       | `MockResolvers`                             | (optional) custom resolvers that are spread after use-relay-mock-environment's `ID` and `String` resolvers. `const resolvers = { ID() {...}, String() {...}, // your custom resolvers go here }` You can of course override the default `ID` and `String` resolvers by specifying your own. Read more about custom resolvers here: https://relay.dev/docs/guides/testing-relay-components/#mock-payload-generator-and-the-relay_test_operation-directive                                                                                                                                                                                 |
| `data?`                  | [`RelayMockData`](modules.md#relaymockdata) | (optional) an object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below). First specify the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example: `js const mockData = { users: { firstName: { mockType: 'faker.name.firstName' } } }`                                                                                                                                                                                                                                                                 |
| `debug?`                 | `boolean`                                   | Enables debug logs. Useful to get the `parentType` of a field to resolve.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `extendStringResolver?`  | `MockResolver`                              | (optional) a function to extend use-relay-mock-environment's `String` resolver. If `relay-mock-default` is returned, then it will continue with the default mock resolvers using FakerJS. **`param`** `context` is the mock resolver context (read more about it here: https://relay.dev/docs/guides/testing-relay-components/#mock-resolver-context) **`param`** `generateId` is a function to generate a globally unique ID.                                                                                                                                                                                                           |
| `forceLoading?`          | `boolean`                                   | (optional) Whether to force loading and don't resolve any GraphQL operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `generatorOptions?`      | `MockPayloadGeneratorOptions`               | (optional) mock generator options. Please read documentation of type MockPayLoadGeneratorOptions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `instantInitialLoading?` | `boolean`                                   | (optional) Whether to instantly load the GraphQL operation. By default there is a 300ms loading time to mimick real-world network conditions. This only applies to the initial loading. If you would like to change the loading time, set `loadTime` instead.                                                                                                                                                                                                                                                                                                                                                                            |
| `loadTime?`              | `number`                                    | (optional) Loading time in miliseconds for each GraphQL operations. Default is 300ms as to mimick real-world network conditions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `searchTypeByName?`      | `string`                                    | (optional) string input to find the full context (including the parentType) of fields that match that name. Example: Given the following query: `graphql query { usersConnection { edges { node { firstName } } } }` To find the context of `firstName`, you simply add the following to your `options`: `json { "searchTypeByName": "firstName", // ... }` Use `searchTypeByPath` for more specific results.                                                                                                                                                                                                                            |
| `searchTypeByPath?`      | `string`                                    | (optional) string input to find the full context (including the parentType) of fields for which the path ends with that string input. Given the following query: `graphql query { usersConnection { edges { node { firstName } } } }` To find the context of `firstName`, you simply add the following to your `options`: `json { "searchTypeByName": "usersConnection.edges.node.firstName", // ... }` `edges.node.firstName`, `node.firstName` and `firstName` would also be valid inputs.                                                                                                                                             |
| `seed?`                  | `number` \| `string`                        | (optional) a number or string used to seed the random generators to get consistent fake data. Useful when doing tests like Jest Snapshots or Visual Regression Tests within Chromatic. If a number is passed in, it directly runs `faker.seed(n)` with `n` being the number that you specify. If a string is passed in, it first converts the string into a hashCode number (like Java's String.hashCode()), and then runs `faker.seed(n)`, where `n` is the hashCode number. Providing `seed` will override property `generatorOptions.randomLengthArray` to false, and will set `geneartorOptions.arrayLength` to 3, unless specified. |

You can read more about `options` [here](https://github.com/richardguerre/use-relay-mock-environment/blob/master/docs/modules.md#relaymockoptions).

# Want to contribute?

This package was bootstrapped using [TSDX](https://tsdx.io/), and all major functions are exported out of /src/index.ts

### Folder Structure

```txt
/src
  index.ts       # EDIT THIS
  utils.ts       # ADD utility functions here
/test
  *.test.ts      # EDIT THESE
```

### Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```
