import { faker } from '@faker-js/faker';
import { RelayMockOptions } from '.';

export const runFakerUsingPath = (fakerPath: string) => {
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

export const startsWithOneOf = (str: string, searchArr: string[]) => {
  let result = false;
  for (const key of searchArr) {
    if (str.startsWith(key)) {
      result = true;
    }
  }

  return result;
};

export const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Converts to 32bit integer
  }
  return hash;
};

/**
 * Runs `faker.seed()` using either `options.fakerSeed` or `options.seed`. If neither is provided, then it won't seed.
 *
 * @param options hook-level options or global-level options that has `fakerSeed` or `seed`
 */
export const seedFaker = (options?: RelayMockOptions) => {
  // seed FakerJS if provided
  if (options?.seed) {
    if (typeof options.seed === 'number') {
      faker.seed(options.seed);
    } else {
      faker.seed(hashCode(options.seed));
    }
  }
};

export const debug = (...value: any[]) => {
  console.log('--use-relay-mock-environment:', ...value);
  return true;
};
