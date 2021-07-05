import { createRelayMockEnvironmentHook } from '../src';

describe('createRelayMockEnvironmentHook', () => {
  it('creates a useRelayMockEnvironment() hook', () => {
    expect(createRelayMockEnvironmentHook()).toMatchSnapshot();
  });
});
