import { useCallback, useEffect, useMemo } from 'react';
import { createMockEnvironment } from 'relay-test-utils';
import faker from 'faker';
import Fuse from 'fuse.js';

import {
  MockPayloadGenerator,
  MockPayloadGeneratorOptions,
  MockResolver,
  MockResolvers,
} from './relay-test-utils';
import fakerTypes, { FakerPath } from './faker';
import { FuseTypes } from './fuse';
import { debug, runFakerUsingPath, seedFaker, startsWithOneOf } from './utils';

/**
 * An object to describe how to override the guessed type/category by use-relay-mock-environment.
 *
 * You can specify one or more of the following:
 * - mockPath
 * - mockParentTypeName
 * - mockType
 * - mockValues
 * - mockDescription
 * - mockNull
 * - mockUndefined
 */
export type RelayMockDataField = {
  /**
   * (optional) path taken by the query (not fragment) to get to the field. Example:
   * ```
   * query {
   *   usersConnection {
   *     edges {
   *       node {
   *         firstName
   *       }
   *     }
   *   }
   * }
   * ```
   * In this case, the path of field `firstName` is `"usersConnection.edges.node.firstName"`.
   */
  mockPath?: string;

  /**
   * type/category of the field. Only faker types are supported for now. Example:
   *
   * Setting mockType to `faker.random.word` will result in generating a random word.
   */
  mockType?: FakerPath;

  /**
   * (optional) an array of possible values to randomly select from. Example:
   *
   * Setting mockValues to `['hello', 'world', 3, true, false]`, the generator will randomly select out of those values.
   *
   * If you want to add weight to one value, you can use the `Array(3).fill(yourValue)`. Example:
   * ```
   * "fieldName": {
   *   mockValues: [Array(3).fill('hello'), 'world', 3, true, false]
   * }
   * ```
   * `'hello'` is 3x more likely to be selected.
   */
  mockValues?: Array<any>;

  /**
   * (optional) a boolean to specify whether the value should resolve to null.
   */
  mockNull?: boolean;

  /**
   * (optional) a boolean to specify whether the value should resolve to undefined.
   */
  mockUndefined?: boolean;

  /**
   * (optional) describe what type/category the field is.
   * This mockDescription goes through the same fuzzy search that the field name goes through.
   */
  mockDescription?: string;
};

/**
 * An object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below).

 * First specify the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example:
 * ```js
 * const mockData = {
 *   users: {
 *     firstName: {
 *       mockType: 'faker.name.firstName'
 *     }
 *   }
 * }
 * ```
 */
export type RelayMockData = {
  [parentTypeName: string]: {
    [fieldName: string]: RelayMockDataField;
  };
};

export type RelayMockOptions = {
  /**
   * (optional) Whether to instantly load the GraphQL operation. By default there is a 300ms loading time to mimick real-world network conditions.
   *
   * This only applies to the initial loading. If you would like to change the loading time, set `loadTime` instead.
   */
  instantInitialLoading?: boolean;

  /**
   * (optional) Loading time in miliseconds for each GraphQL operations. Default is 300ms as to mimick real-world network conditions.
   */
  loadTime?: number;

  /**
   * (optional) Whether to force loading and don't resolve any GraphQL operation.
   */
  forceLoading?: boolean;

  /**
   * (optional) mock generator options. Please read documentation of type MockPayLoadGeneratorOptions.
   */
  generatorOptions?: MockPayloadGeneratorOptions;

  /**
   * (optional) custom resolvers that are spread after use-relay-mock-environment's `ID` and `String` resolvers.
   * ```
   * const resolvers = {
   *   ID() {...},
   *   String() {...},
   *   // your custom resolvers go here
   * }
   * ```
   * You can of course override the default `ID` and `String` resolvers by specifying your own.
   *
   * Read more about custom resolvers here: https://relay.dev/docs/guides/testing-relay-components/#mock-payload-generator-and-the-relay_test_operation-directive
   */
  customResolvers?: MockResolvers;

  /**
   * (optional) a function to extend use-relay-mock-environment's `String` resolver.
   * If `relay-mock-default` is returned, then it will continue with the default mock resolvers using FakerJS.
   *
   * @param context `context` is the mock resolver context (read more about it here: https://relay.dev/docs/guides/testing-relay-components/#mock-resolver-context)
   * @param generateId `generateId` is a function to generate a globally unique ID.
   */
  extendStringResolver?: MockResolver;

  /**
   * (optional) an object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below).
   *
   * First specify the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example:
   * ```js
   * const mockData = {
   *   users: {
   *     firstName: {
   *       mockType: 'faker.name.firstName'
   *     }
   *   }
   * }
   * ```
   */
  data?: RelayMockData;

  /**
   * (optional) a number or string used to seed the random generators to get consistent fake data.
   * Useful when doing tests like Jest Snapshots or Visual Regression Tests within Chromatic.
   *
   * If a number is passed in, it directly runs `faker.seed(n)` with `n` being the number that you specify.
   * If a string is passed in, it first converts the string into a hashCode number (like Java's String.hashCode()), and then runs `faker.seed(n)`, where `n` is the hashCode number.
   *
   * Providing `seed` will override property `generatorOptions.randomLengthArray` to false, and will set `geneartorOptions.arrayLength` to 3, unless specified.
   */
  seed?: number | string;

  /**
   * Enables debug logs. Useful to get the `parentType` of a field to resolve.
   */
  debug?: boolean;

  /**
   * (optional) string input to find the full context (including the parentType) of fields that match that name. Example:
   *
   * Given the following query:
   * ```graphql
   * query {
   *   usersConnection {
   *     edges {
   *       node {
   *         firstName
   *       }
   *     }
   *   }
   * }
   * ```
   * To find the context of `firstName`, you simply add the following to your `options`:
   * ```json
   * {
   *   "searchTypeByName": "firstName",
   *   // ...
   * }
   * ```
   *
   * Use `searchTypeByPath` for more specific results.
   */
  searchTypeByName?: string;

  /**
   * (optional) string input to find the full context (including the parentType) of fields for which the path ends with that string input.
   *
   * Given the following query:
   * ```graphql
   * query {
   *   usersConnection {
   *     edges {
   *       node {
   *         firstName
   *       }
   *     }
   *   }
   * }
   * ```
   * To find the context of `firstName`, you simply add the following to your `options`:
   * ```json
   * {
   *   "searchTypeByName": "usersConnection.edges.node.firstName",
   *   // ...
   * }
   * ```
   * `edges.node.firstName`, `node.firstName` and `firstName` would also be valid inputs.
   */
  searchTypeByPath?: string;
};

/**
 * Same as the `RelayMockOptions` below.
 */
export type RelayMockGlobalOptions = RelayMockOptions & {
  /**
   * (optional) FuseJS options as outlined here: https://fusejs.io/api/options.html
   */
  fuseOptions?: FuseTypes.IFuseOptions<any>;

  /**
   * (optional) Whether to force instant initial loading on all environements created using the `useRelayMockEnvironment`. This option takes priority over the `instantInitialLoading` option.
   *
   * This is useful in visual testing tools, like Storybook's Chromatic which takes snapshots at first-paint.
   */
  forceInstantInitialLoading?: boolean;
};

/**
 * The function to create the `useRelayMockEnvironment()` hook.
 *
 * This is where the global options and FuseJS (used for fuzzy searching) are initialized.
 *
 * @param globalOptions options to be applied to all instances of useRelayMockEnvironment hook. Read more about the global options above.
 * @returns a function that is the `useRelayMockEnvironment()` React hook. Read more about its `options` above, in RelayMockOptions.
 */
export function createRelayMockEnvironmentHook(
  globalOptions?: RelayMockGlobalOptions
) {
  const fuseOptions: FuseTypes.IFuseOptions<any> = {
    keys: ['keywords'],
    ...globalOptions?.fuseOptions,
  };
  const fuse = new Fuse(fakerTypes, fuseOptions);

  function useRelayMockEnvironment(options?: RelayMockOptions) {
    const opts: RelayMockOptions = {
      ...globalOptions,
      ...options,
      data: {
        ...globalOptions?.data,
        ...options?.data,
      },
      generatorOptions: {
        ...globalOptions?.generatorOptions,
        ...options?.generatorOptions,
      },
      customResolvers: {
        ...globalOptions?.customResolvers,
        ...options?.customResolvers,
      },
    };
    opts.debug &&
      debug('global options', globalOptions) &&
      debug('local options:', options) &&
      debug('combinded options:', opts);

    const environment = useMemo(() => createMockEnvironment(), []);

    const fieldNameToMockTypeMap = new Map();
    seedFaker(options);

    const main = useCallback(() => {
      if (!opts.forceLoading) {
        try {
          environment.mock.resolveMostRecentOperation(operation => {
            opts.debug && debug('operation:', operation);
            return MockPayloadGenerator.generate(
              operation,
              {
                String(context, generateId) {
                  // console out context if requested
                  opts.debug && debug('String resolver context:', context);

                  // search type by name or alias
                  if (
                    opts.searchTypeByName === context.name ||
                    opts.searchTypeByName === context.alias
                  ) {
                    console.log(
                      'context of field matching search name:',
                      context
                    );
                  }

                  // search type by path
                  if (opts.searchTypeByPath && context.path) {
                    const joinedPath = context.path.join('.');
                    joinedPath.endsWith(opts.searchTypeByPath) &&
                      console.log(
                        'context of field matching search path:',
                        context
                      );
                  }

                  // custom injected resolvers
                  if (opts.extendStringResolver) {
                    const extendStringReturn = opts.extendStringResolver(
                      context,
                      generateId
                    );
                    if (extendStringReturn !== 'relay-mock-default') {
                      return extendStringReturn;
                    }
                  }

                  // custom data from options
                  const data =
                    opts.data?.[context.parentType ?? '']?.[context.name ?? ''];
                  if (
                    data &&
                    (!data.mockPath ||
                      data.mockPath === context.path?.join('.'))
                  ) {
                    if (data.mockNull) {
                      return null;
                    }
                    if (data.mockUndefined) {
                      return undefined;
                    }
                    if (data.mockValues) {
                      let rngIndex = opts.seed
                        ? 0
                        : Math.round(
                            Math.random() * (data.mockValues.length - 1)
                          );
                      if (rngIndex < 0 || rngIndex > data.mockValues.length - 1)
                        rngIndex = 0;
                      const result = data.mockValues[rngIndex];
                      return result;
                    }
                    if (data.mockType) {
                      opts.debug &&
                        debug(`faker type for ${context.name}:`, data.mockType);
                      return runFakerUsingPath(data.mockType);
                    }
                  }

                  // TODO: extended keywords (use another fuse from options)

                  // special start/end of context.name searches
                  const lowerCasedName = context.name?.toLowerCase() ?? '';
                  if (
                    startsWithOneOf(lowerCasedName, [
                      'is',
                      'was',
                      'has',
                      'had',
                      'can',
                      'will',
                      'need',
                      'use',
                    ])
                  ) {
                    return faker.datatype.boolean();
                  }
                  if (lowerCasedName.endsWith('id')) {
                    return generateId();
                  }
                  if (
                    ![
                      'createdat',
                      'updatedat',
                      'created_at',
                      'updated_at',
                    ].includes(lowerCasedName) &&
                    lowerCasedName.endsWith('at')
                  ) {
                    return faker.date.recent();
                  }

                  // optimistic return
                  if (fieldNameToMockTypeMap.has(context.name)) {
                    const fakerType = fieldNameToMockTypeMap.get(context.name);
                    opts.debug &&
                      debug(`faker type for ${context.name}:`, fakerType);
                    return runFakerUsingPath(fakerType);
                  }

                  // fuzzy search specified description
                  if (
                    data &&
                    (!data.mockPath ||
                      data.mockPath === context.path?.join('.')) &&
                    data.mockDescription
                  ) {
                    const results = fuse.search(data.mockDescription);
                    if (results.length > 0 && results[0]?.item.type) {
                      fieldNameToMockTypeMap.set(
                        context.name,
                        results[0].item.type
                      );
                      opts.debug &&
                        debug(
                          `faker type for ${context.name}:`,
                          results[0].item.type
                        );
                      return runFakerUsingPath(results[0].item.type);
                    }
                  }

                  // fuzzy search by context.name
                  const results = fuse.search(context.name ?? '');
                  if (results.length > 0 && results[0]?.item.type) {
                    fieldNameToMockTypeMap.set(
                      context.name,
                      results[0].item.type
                    );
                    opts.debug &&
                      debug(
                        `faker type for ${context.name}:`,
                        results[0].item.type
                      );
                    return runFakerUsingPath(results[0]?.item.type);
                  }

                  return `<${context.name}-${generateId()}>`;
                },
                ...opts.customResolvers,
              },
              {
                ...opts.generatorOptions,
                ...(opts.seed
                  ? {
                      randomArrayLength: false,
                      arrayLength: opts.generatorOptions?.arrayLength ?? 3,
                      sequencialInlineFragmentTypename: true,
                    }
                  : {}),
              }
            );
          });
        } catch (err) {
          // ignore errors related to triggering resolveMostRecentOperation() too many times
          if (
            // @ts-ignore
            !new Error(err).message.includes(
              'MockEnvironment: Cannot respond to request, it has not been requested yet.'
            )
          ) {
            throw err;
          }
        }
      }
    }, [environment.mock, fieldNameToMockTypeMap, opts]);

    useEffect(() => {
      if (
        globalOptions?.forceInstantInitialLoading ||
        opts.instantInitialLoading
      ) {
        main();
      }
      const interval = setInterval(main, opts.loadTime ?? 300);

      return () => {
        clearInterval(interval);
      };
    }, [main, opts.instantInitialLoading, opts.loadTime]);

    return environment;
  }

  return useRelayMockEnvironment;
}
