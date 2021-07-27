import faker from 'faker';

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
