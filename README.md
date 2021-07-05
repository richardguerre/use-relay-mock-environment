# use-relay-mock-environment

A super easy way to test Relay Components in Storybook or in dummy pages.

## How does it work?

The hook does three main things:

1. Tries to guess which data type each individual field is, using [fuse.js](https://fusejs.io/) to search through a list of keywords mapping to types. Example: `fieldName: "sirname"` -> `type: "faker.name.lastName"`.
2. Using the above guessed type, it generates fake data for that field, using [faker.js](https://www.npmjs.com/package/faker). Example: `guessedType: "faker.name.lastName"` -> `fakeData: "Doe"`.
3. Calls `environment.mock.resolveMostRecentOperation()`, from [relay-test-utils](https://github.com/facebook/relay/tree/main/packages/relay-test-utils), on a interval (300ms by default) to resolve all operations (not just the first Query/Mutation/Subscription) and create mock data from the relay-compiled GraphQL. It is slightly modified to have more contentful mock data (e.g. length of arrays that match with your limit parameters - example: `first: 10` --> `Array(10)`, or random length arrays).

### What if the guessed type is wrong?

If the hook guesses the type of a field wrong, you can provide additional information in the `data` in the options of `createRelayMockEnvironmentHook()` (global level) or `useRelayMockEnvironment()` (component specific level):

```js
const useRelayMockEnvironment = createRelayMockEnvironmentHook({
  data: {
    [fieldName]: {
      type: 'faker.random.word',
    },
  },
});

// OR

const environment = useRelayMockEnvironment({
  data: {
    [fieldName]: {
      type: 'faker.random.word',
      description: 'random word', // OR you can try describing it,  if you don't know the exact faker type.
    },
  },
});
```

# Examples

Create the useRelayMockEnvironment hook using createRelayMockEnvironmentHook() and passing in your global options

```jsx
// useRelayMockEnvironment.(js | jsx | ts | tsx)
import createRelayMockEnvironmentHook from 'use-relay-mock-environment';

const useRelayMockEnvironment = createRelayMockEnvironmentHook({
  // ...Add global options here (optional)
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
    // ...Add story specific options here (optional)
  });

  return (
    <RelayEnvironmentProvider environment={environment}>
      <MyComponent />
    </RelayEnvironmentProvider>
  );
};
```

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
