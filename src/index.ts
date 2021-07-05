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

export type RelayMockOptions = {
  instantInitialLoading?: boolean;
  loadTime?: number;
  forceLoading?: boolean;
  generatorOptions?: MockPayloadGeneratorOptions;
  customResolvers?: MockResolvers;
  extendStringResolver?: MockResolver;
  data?: {
    [fieldName: string]: {
      path?: string;
      parentTypeName?: string;
      type?: FakerPath;
      values?: Array<any>;
      description?: string;
    };
  };
};
export type GlobalOptions = RelayMockOptions & {
  fuseOptions?: FuseTypes.IFuseOptions<any>;
};

export const createRelayMockEnvironmentHook = (
  globalOptions?: GlobalOptions
) => {
  console.log('createRelayMockEnvironmentHook');
  const fuseOptions: FuseTypes.IFuseOptions<any> = {
    keys: ['keywords'],
    ...globalOptions?.fuseOptions,
  };
  const fuse = new Fuse(fakerTypes, fuseOptions);

  const useRelayMockEnvironment = (options?: RelayMockOptions) => {
    console.log('useRelayMockEnvironment');
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
                const data = opts.data?.[context.name ?? ''];
                // if (context.name === 'firstName') console.log(data);
                if (
                  data &&
                  (!data.parentTypeName ||
                    data.parentTypeName === context.parentType) &&
                  (!data.path || data.path === context.path?.join('.'))
                ) {
                  if (data.values) {
                    const result =
                      data.values[
                        Math.round(Math.random() * data.values.length) - 1
                      ];
                    if (result) return result;
                  }
                  if (data.type) {
                    return runFakerUsingPath(data.type);
                  }
                }

                // TODO: extended keywords (use another fuse from options)

                // special start/end of context.name searches
                const lowerCasedName = context.name?.toLowerCase() ?? '';
                if (
                  startsWithArray(lowerCasedName, [
                    'is',
                    'was',
                    'has',
                    'had',
                    'can',
                    'will',
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
                  (!data.parentTypeName ||
                    data.parentTypeName === context.parentType) &&
                  (!data.path || data.path === context.path?.join('.')) &&
                  data.description
                ) {
                  const results = fuse.search(data.description);
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
  };

  return useRelayMockEnvironment;
};

const runFakerUsingPath = (fakerPath: string) => {
  if (fakerPath.slice(0, 6) !== 'faker.') {
    return 'relay-mock-default';
  }
  const path = fakerPath.slice(6).split('.');

  let func = faker as any;
  for (const el of path) {
    func = func[el];
  }

  if (typeof func === 'function') {
    return (func as Function)();
  }

  return 'provided faker path is not a function';
};

const startsWithArray = (str: string, searchArr: string[]) => {
  let result = false;
  for (const key of searchArr) {
    if (str.startsWith(key)) {
      result = true;
    }
  }

  return result;
};

export default createRelayMockEnvironmentHook;
