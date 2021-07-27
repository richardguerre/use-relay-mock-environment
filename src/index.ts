import { useEffect, useMemo } from 'react';
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
import { runFakerUsingPath, startsWithOneOf } from './utils';

/**
 * An object to describe how to override the guessed type/category by use-relay-mock-environment.
 *
 * You can specify one or more of the following:
 * - mockPath
 * - mockParentTypeName
 * - mockType
 * - mockValues
 * - mockDescription
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
   * (optional) the name of the parent type. Example:
   * ```
   * fragment UserProfile_user on users {
   *   firstName
   * }
   * ```
   * In this case, the parent type name of field `firstName` is `users`.
   *
   * NOTE: Use the new notation to override using parentTypeName:
   * ```
   * const data = {
   *   "parentTypeName": {
   *     "fieldName": {
   *       mockType: 'faker.random.word',
   *     }
   *   }
   * }
   * ```
   */
  mockParentTypeName?: string;

  /**
   * type/category of the field. Only faker types are supported for now. Example:
   * Setting mockType to `faker.random.word` will result in generating a random word.
   */
  mockType?: FakerPath;

  /**
   * (optional) an array of possible values to randomly select from. Example:
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
   * (optional) describe what type/category the field is.
   * This mockDescription goes through the same fuzzy search that the field name goes through.
   */
  mockDescription?: string;
};

/**
 * An object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below).
 *
 * For general use, you can just specify the `fieldName` as the key. Example:
 * ```
 * const mockData = {
 *   firstName: {
 *     mockType: 'faker.name.firstName'
 *   }
 * }
 * ```
 * OR be more specific by first specifying the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example:
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
} & {
  [fieldName: string]: RelayMockDataField;
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
   *
   * @param context `context` is the mock resolver context (read more about it here: https://relay.dev/docs/guides/testing-relay-components/#mock-resolver-context)
   * @param generateId `generateId` is a function to generate a globally unique ID number.
   */
  extendStringResolver?: MockResolver;

  /**
   * (optional) an object containing overrides to the types/categories of each field, where each key is the `fieldName` or `parentTypeName` (see below).
   *
   * For general use, you can just specify the `fieldName` as the key. Example:
   * ```
   * const mockData = {
   *   firstName: {
   *     mockType: 'faker.name.firstName'
   *   }
   * }
   * ```
   * Or be more specific by first specifying the `parentTypeName` as the key, and the value is an object containing the `fieldName`(s) as the key(s). Example:
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
};

/**
 * Same as the `RelayMockOptions` below.
 */
export type RelayMockGlobalOptions = RelayMockOptions & {
  /**
   * (optional) FuseJS options as outlined here: https://fusejs.io/api/options.html
   */
  fuseOptions?: FuseTypes.IFuseOptions<any>;
};

/**
 * The function to create the `useRelayMockEnvironment()` hook.
 *
 * This is where FuseJS (used for fuzzy searching) is initialized.
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
    };

    const environment = useMemo(() => createMockEnvironment(), []);

    const fieldNameToMockTypeMap = new Map();

    const main = () => {
      if (!opts.forceLoading) {
        try {
          environment.mock.resolveMostRecentOperation(operation => {
            return MockPayloadGenerator.generate(operation, {
              String(context, generateId) {
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
                // specific (parentTypeName + name)
                const specificData =
                  opts.data?.[context.parentType ?? '']?.[context.name ?? ''];
                if (
                  specificData &&
                  (!specificData.mockParentTypeName ||
                    specificData.mockParentTypeName === context.parentType) &&
                  (!specificData.mockPath ||
                    specificData.mockPath === context.path?.join('.'))
                ) {
                  if (specificData.mockValues) {
                    const result =
                      specificData.mockValues[
                        Math.round(
                          Math.random() * (specificData.mockValues.length - 1)
                        )
                      ];
                    if (result) return result;
                  }
                  if (specificData.mockType) {
                    return runFakerUsingPath(specificData.mockType);
                  }
                }
                // general (name only)
                const data = opts.data?.[context.name ?? ''];
                if (
                  data &&
                  (!data.mockParentTypeName ||
                    data.mockParentTypeName === context.parentType) &&
                  (!data.mockPath || data.mockPath === context.path?.join('.'))
                ) {
                  if (data.mockValues) {
                    const result =
                      data.mockValues[
                        Math.round(Math.random() * (data.mockValues.length - 1))
                      ];
                    if (result) return result;
                  }
                  if (data.mockType) {
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
                  return runFakerUsingPath(
                    fieldNameToMockTypeMap.get(context.name)
                  );
                }

                // fuzzy search specified description
                if (
                  data &&
                  (!data.mockParentTypeName ||
                    data.mockParentTypeName === context.parentType) &&
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
                  return runFakerUsingPath(results[0]?.item.type);
                }

                return `<${context.name}-${generateId()}>`;
              },
              ...opts.customResolvers,
            });
          });
        } catch (err) {
          // ignore errors related to triggering resolveMostRecentOperation() too many times
          if (
            !new Error(err).message.includes(
              'MockEnvironment: Cannot respond to request, it has not been requested yet.'
            )
          ) {
            throw err;
          }
        }
      }
    };

    useEffect(() => {
      if (opts.instantInitialLoading) {
        main();
      }
      const interval = setInterval(main, opts.loadTime ?? 300);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return environment;
  }

  return useRelayMockEnvironment;
}
