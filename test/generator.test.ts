import generator from '../src/relay-test-utils/RelayMockPayloadGenerator';

describe('test the RelayMockGenerator.generate function', () => {
  it('alternates between inline fragments when using the sequencialInlineFragmentType', () => {
    const output = generator.generate(
      input,
      {},
      { arrayLength: 3, sequencialInlineFragmentTypename: true }
    );

    expect(output).toMatchObject({
      data: {
        mergeRequest: {
          events: {
            edges: [
              {
                node: {
                  event: [
                    {
                      __typename: 'Snapshot',
                      createdAt: '<mock-value-for-field-"createdAt">',
                      message: '<mock-value-for-field-"message">',
                      snapshotedBy: {
                        name: '<mock-value-for-field-"name">',
                        avatar: {
                          url: '<mock-value-for-field-"url">',
                        },
                        id: '<Profile-mock-id-1>',
                      },
                      __isNode: true,
                      id: '<mock-id-2>',
                    },
                    {
                      __typename: 'MergeRequestConversation',
                      diff: {
                        before: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-3>',
                            },
                            id: '<FigmaPage-mock-id-4>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-5>',
                        },
                        after: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-6>',
                            },
                            id: '<FigmaPage-mock-id-7>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-8>',
                        },
                        id: '<TopLevelNodeDiff-mock-id-9>',
                      },
                      comments: {
                        edges: [
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-10>',
                              },
                              id: '<MergeRequestComment-mock-id-11>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-12>',
                              },
                              id: '<MergeRequestComment-mock-id-13>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-14>',
                              },
                              id: '<MergeRequestComment-mock-id-15>',
                            },
                          },
                        ],
                      },
                      __isNode: true,
                      id: '<mock-id-16>',
                    },
                    {
                      __typename: 'Snapshot',
                      createdAt: '<mock-value-for-field-"createdAt">',
                      message: '<mock-value-for-field-"message">',
                      snapshotedBy: {
                        name: '<mock-value-for-field-"name">',
                        avatar: {
                          url: '<mock-value-for-field-"url">',
                        },
                        id: '<Profile-mock-id-17>',
                      },
                      __isNode: true,
                      id: '<mock-id-18>',
                    },
                  ],
                  id: '<MergeRequestEvent-mock-id-19>',
                },
              },
              {
                node: {
                  event: [
                    {
                      __typename: 'MergeRequestConversation',
                      diff: {
                        before: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-20>',
                            },
                            id: '<FigmaPage-mock-id-21>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-22>',
                        },
                        after: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-23>',
                            },
                            id: '<FigmaPage-mock-id-24>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-25>',
                        },
                        id: '<TopLevelNodeDiff-mock-id-26>',
                      },
                      comments: {
                        edges: [
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-27>',
                              },
                              id: '<MergeRequestComment-mock-id-28>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-29>',
                              },
                              id: '<MergeRequestComment-mock-id-30>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-31>',
                              },
                              id: '<MergeRequestComment-mock-id-32>',
                            },
                          },
                        ],
                      },
                      __isNode: true,
                      id: '<mock-id-33>',
                    },
                    {
                      __typename: 'Snapshot',
                      createdAt: '<mock-value-for-field-"createdAt">',
                      message: '<mock-value-for-field-"message">',
                      snapshotedBy: {
                        name: '<mock-value-for-field-"name">',
                        avatar: {
                          url: '<mock-value-for-field-"url">',
                        },
                        id: '<Profile-mock-id-34>',
                      },
                      __isNode: true,
                      id: '<mock-id-35>',
                    },
                    {
                      __typename: 'MergeRequestConversation',
                      diff: {
                        before: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-36>',
                            },
                            id: '<FigmaPage-mock-id-37>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-38>',
                        },
                        after: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-39>',
                            },
                            id: '<FigmaPage-mock-id-40>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-41>',
                        },
                        id: '<TopLevelNodeDiff-mock-id-42>',
                      },
                      comments: {
                        edges: [
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-43>',
                              },
                              id: '<MergeRequestComment-mock-id-44>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-45>',
                              },
                              id: '<MergeRequestComment-mock-id-46>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-47>',
                              },
                              id: '<MergeRequestComment-mock-id-48>',
                            },
                          },
                        ],
                      },
                      __isNode: true,
                      id: '<mock-id-49>',
                    },
                  ],
                  id: '<MergeRequestEvent-mock-id-50>',
                },
              },
              {
                node: {
                  event: [
                    {
                      __typename: 'Snapshot',
                      createdAt: '<mock-value-for-field-"createdAt">',
                      message: '<mock-value-for-field-"message">',
                      snapshotedBy: {
                        name: '<mock-value-for-field-"name">',
                        avatar: {
                          url: '<mock-value-for-field-"url">',
                        },
                        id: '<Profile-mock-id-51>',
                      },
                      __isNode: true,
                      id: '<mock-id-52>',
                    },
                    {
                      __typename: 'MergeRequestConversation',
                      diff: {
                        before: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-53>',
                            },
                            id: '<FigmaPage-mock-id-54>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-55>',
                        },
                        after: {
                          name: '<mock-value-for-field-"name">',
                          page: {
                            name: '<mock-value-for-field-"name">',
                            file: {
                              name: '<mock-value-for-field-"name">',
                              id: '<FigmaFile-mock-id-56>',
                            },
                            id: '<FigmaPage-mock-id-57>',
                          },
                          tree: '<mock-value-for-field-"tree">',
                          id: '<TopLevelNode-mock-id-58>',
                        },
                        id: '<TopLevelNodeDiff-mock-id-59>',
                      },
                      comments: {
                        edges: [
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-60>',
                              },
                              id: '<MergeRequestComment-mock-id-61>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-62>',
                              },
                              id: '<MergeRequestComment-mock-id-63>',
                            },
                          },
                          {
                            node: {
                              createdAt: '<mock-value-for-field-"createdAt">',
                              body: '<mock-value-for-field-"body">',
                              commentedBy: {
                                handle: '<mock-value-for-field-"handle">',
                                name: '<mock-value-for-field-"name">',
                                avatar: {
                                  url: '<mock-value-for-field-"url">',
                                },
                                id: '<Profile-mock-id-64>',
                              },
                              id: '<MergeRequestComment-mock-id-65>',
                            },
                          },
                        ],
                      },
                      __isNode: true,
                      id: '<mock-id-66>',
                    },
                    {
                      __typename: 'Snapshot',
                      createdAt: '<mock-value-for-field-"createdAt">',
                      message: '<mock-value-for-field-"message">',
                      snapshotedBy: {
                        name: '<mock-value-for-field-"name">',
                        avatar: {
                          url: '<mock-value-for-field-"url">',
                        },
                        id: '<Profile-mock-id-67>',
                      },
                      __isNode: true,
                      id: '<mock-id-68>',
                    },
                  ],
                  id: '<MergeRequestEvent-mock-id-69>',
                },
              },
            ],
          },
          id: '<MergeRequest-mock-id-70>',
        },
      },
    });
  });
});

const input = {
  fragment: {
    kind: 'SingularReaderSelector',
    dataID: 'client:root',
    isWithinUnmatchedTypeRefinement: false,
    node: {
      argumentDefinitions: [
        {
          defaultValue: null,
          kind: 'LocalArgument',
          name: 'mergeRequestId',
        },
      ],
      kind: 'Fragment',
      metadata: null,
      name: 'MRVTimelineQuery',
      selections: [
        {
          args: [
            {
              kind: 'Variable',
              name: 'mergeRequestId',
              variableName: 'mergeRequestId',
            },
          ],
          kind: 'FragmentSpread',
          name: 'MRVTimeline_timelineData',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    variables: {
      mergeRequestId: 'mockId',
    },
    owner: {
      identifier: 'ac4c0409e26b4f8385aab5c2081d8b1b{"mergeRequestId":"mockId"}',
      node: {
        fragment: {
          argumentDefinitions: [
            {
              defaultValue: null,
              kind: 'LocalArgument',
              name: 'mergeRequestId',
            },
          ],
          kind: 'Fragment',
          metadata: null,
          name: 'MRVTimelineQuery',
          selections: [
            {
              args: [
                {
                  kind: 'Variable',
                  name: 'mergeRequestId',
                  variableName: 'mergeRequestId',
                },
              ],
              kind: 'FragmentSpread',
              name: 'MRVTimeline_timelineData',
            },
          ],
          type: 'Query',
          abstractKey: null,
        },
        kind: 'Request',
        operation: {
          argumentDefinitions: [
            {
              defaultValue: null,
              kind: 'LocalArgument',
              name: 'mergeRequestId',
            },
          ],
          kind: 'Operation',
          name: 'MRVTimelineQuery',
          selections: [
            {
              alias: null,
              args: [
                {
                  kind: 'Variable',
                  name: 'id',
                  variableName: 'mergeRequestId',
                },
              ],
              concreteType: 'MergeRequest',
              kind: 'LinkedField',
              name: 'mergeRequest',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'MergeRequestEventConnection',
                  kind: 'LinkedField',
                  name: 'events',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'MergeRequestEventEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'MergeRequestEvent',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              concreteType: null,
                              kind: 'LinkedField',
                              name: 'event',
                              plural: true,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: '__typename',
                                  storageKey: null,
                                },
                                {
                                  kind: 'InlineFragment',
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'createdAt',
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'message',
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'Profile',
                                      kind: 'LinkedField',
                                      name: 'snapshotedBy',
                                      plural: false,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'name',
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'FileInfo',
                                          kind: 'LinkedField',
                                          name: 'avatar',
                                          plural: false,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'url',
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'id',
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                  ],
                                  type: 'Snapshot',
                                  abstractKey: null,
                                },
                                {
                                  kind: 'InlineFragment',
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'TopLevelNodeDiff',
                                      kind: 'LinkedField',
                                      name: 'diff',
                                      plural: false,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'TopLevelNode',
                                          kind: 'LinkedField',
                                          name: 'before',
                                          plural: false,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'name',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType: 'FigmaPage',
                                              kind: 'LinkedField',
                                              name: 'page',
                                              plural: false,
                                              selections: [
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'name',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  concreteType: 'FigmaFile',
                                                  kind: 'LinkedField',
                                                  name: 'file',
                                                  plural: false,
                                                  selections: [
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'name',
                                                      storageKey: null,
                                                    },
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'id',
                                                      storageKey: null,
                                                    },
                                                  ],
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'id',
                                                  storageKey: null,
                                                },
                                              ],
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'tree',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'id',
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'TopLevelNode',
                                          kind: 'LinkedField',
                                          name: 'after',
                                          plural: false,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'name',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType: 'FigmaPage',
                                              kind: 'LinkedField',
                                              name: 'page',
                                              plural: false,
                                              selections: [
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'name',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  concreteType: 'FigmaFile',
                                                  kind: 'LinkedField',
                                                  name: 'file',
                                                  plural: false,
                                                  selections: [
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'name',
                                                      storageKey: null,
                                                    },
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'id',
                                                      storageKey: null,
                                                    },
                                                  ],
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'id',
                                                  storageKey: null,
                                                },
                                              ],
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'tree',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'id',
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'id',
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType:
                                        'MergeRequestCommentConnection',
                                      kind: 'LinkedField',
                                      name: 'comments',
                                      plural: false,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType:
                                            'MergeRequestCommentEdge',
                                          kind: 'LinkedField',
                                          name: 'edges',
                                          plural: true,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType:
                                                'MergeRequestComment',
                                              kind: 'LinkedField',
                                              name: 'node',
                                              plural: false,
                                              selections: [
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'createdAt',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'body',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  concreteType: 'Profile',
                                                  kind: 'LinkedField',
                                                  name: 'commentedBy',
                                                  plural: false,
                                                  selections: [
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'handle',
                                                      storageKey: null,
                                                    },
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'name',
                                                      storageKey: null,
                                                    },
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      concreteType: 'FileInfo',
                                                      kind: 'LinkedField',
                                                      name: 'avatar',
                                                      plural: false,
                                                      selections: [
                                                        {
                                                          alias: null,
                                                          args: null,
                                                          kind: 'ScalarField',
                                                          name: 'url',
                                                          storageKey: null,
                                                        },
                                                      ],
                                                      storageKey: null,
                                                    },
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'id',
                                                      storageKey: null,
                                                    },
                                                  ],
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'id',
                                                  storageKey: null,
                                                },
                                              ],
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                  ],
                                  type: 'MergeRequestConversation',
                                  abstractKey: null,
                                },
                                {
                                  kind: 'InlineFragment',
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'id',
                                      storageKey: null,
                                    },
                                  ],
                                  type: 'Node',
                                  abstractKey: '__isNode',
                                },
                              ],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'id',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'id',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
        },
        params: {
          cacheID: 'ac4c0409e26b4f8385aab5c2081d8b1b',
          id: null,
          metadata: {},
          name: 'MRVTimelineQuery',
          operationKind: 'query',
          text:
            'query MRVTimelineQuery(\n  $mergeRequestId: ID!\n) {\n  ...MRVTimeline_timelineData_4MRD8\n}\n\nfragment Avatar_profile on Profile {\n  name\n  avatar {\n    url\n  }\n}\n\nfragment ConversationComment_comment on MergeRequestComment {\n  createdAt\n  body\n  commentedBy {\n    handle\n    ...Avatar_profile\n    id\n  }\n}\n\nfragment DesignDiff_diff on TopLevelNodeDiff {\n  before {\n    name\n    page {\n      name\n      file {\n        name\n        id\n      }\n      id\n    }\n    ...TopLevelNodeRender_topLevelNode\n    id\n  }\n  after {\n    name\n    page {\n      name\n      file {\n        name\n        id\n      }\n      id\n    }\n    ...TopLevelNodeRender_topLevelNode\n    id\n  }\n}\n\nfragment MRTimelineConversation_conversation on MergeRequestConversation {\n  diff {\n    ...DesignDiff_diff\n    id\n  }\n  comments {\n    edges {\n      node {\n        ...ConversationComment_comment\n        id\n      }\n    }\n  }\n}\n\nfragment MRTimelineSnapshot_snapshot on Snapshot {\n  createdAt\n  message\n  snapshotedBy {\n    ...Avatar_profile\n    id\n  }\n}\n\nfragment MRVTimeline_timelineData_4MRD8 on Query {\n  mergeRequest(id: $mergeRequestId) {\n    events {\n      edges {\n        node {\n          event {\n            __typename\n            ...MRTimelineConversation_conversation\n            ...MRTimelineSnapshot_snapshot\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment TopLevelNodeRender_topLevelNode on TopLevelNode {\n  tree\n}\n',
        },
        hash: 'c0255046f856398e820a659bb4d4338b',
      },
      variables: {
        mergeRequestId: 'mockId',
      },
      cacheConfig: {
        force: true,
      },
    },
  },
  request: {
    identifier: 'ac4c0409e26b4f8385aab5c2081d8b1b{"mergeRequestId":"mockId"}',
    node: {
      fragment: {
        argumentDefinitions: [
          {
            defaultValue: null,
            kind: 'LocalArgument',
            name: 'mergeRequestId',
          },
        ],
        kind: 'Fragment',
        metadata: null,
        name: 'MRVTimelineQuery',
        selections: [
          {
            args: [
              {
                kind: 'Variable',
                name: 'mergeRequestId',
                variableName: 'mergeRequestId',
              },
            ],
            kind: 'FragmentSpread',
            name: 'MRVTimeline_timelineData',
          },
        ],
        type: 'Query',
        abstractKey: null,
      },
      kind: 'Request',
      operation: {
        argumentDefinitions: [
          {
            defaultValue: null,
            kind: 'LocalArgument',
            name: 'mergeRequestId',
          },
        ],
        kind: 'Operation',
        name: 'MRVTimelineQuery',
        selections: [
          {
            alias: null,
            args: [
              {
                kind: 'Variable',
                name: 'id',
                variableName: 'mergeRequestId',
              },
            ],
            concreteType: 'MergeRequest',
            kind: 'LinkedField',
            name: 'mergeRequest',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'MergeRequestEventConnection',
                kind: 'LinkedField',
                name: 'events',
                plural: false,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: 'MergeRequestEventEdge',
                    kind: 'LinkedField',
                    name: 'edges',
                    plural: true,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: 'MergeRequestEvent',
                        kind: 'LinkedField',
                        name: 'node',
                        plural: false,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            concreteType: null,
                            kind: 'LinkedField',
                            name: 'event',
                            plural: true,
                            selections: [
                              {
                                alias: null,
                                args: null,
                                kind: 'ScalarField',
                                name: '__typename',
                                storageKey: null,
                              },
                              {
                                kind: 'InlineFragment',
                                selections: [
                                  {
                                    alias: null,
                                    args: null,
                                    kind: 'ScalarField',
                                    name: 'createdAt',
                                    storageKey: null,
                                  },
                                  {
                                    alias: null,
                                    args: null,
                                    kind: 'ScalarField',
                                    name: 'message',
                                    storageKey: null,
                                  },
                                  {
                                    alias: null,
                                    args: null,
                                    concreteType: 'Profile',
                                    kind: 'LinkedField',
                                    name: 'snapshotedBy',
                                    plural: false,
                                    selections: [
                                      {
                                        alias: null,
                                        args: null,
                                        kind: 'ScalarField',
                                        name: 'name',
                                        storageKey: null,
                                      },
                                      {
                                        alias: null,
                                        args: null,
                                        concreteType: 'FileInfo',
                                        kind: 'LinkedField',
                                        name: 'avatar',
                                        plural: false,
                                        selections: [
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'url',
                                            storageKey: null,
                                          },
                                        ],
                                        storageKey: null,
                                      },
                                      {
                                        alias: null,
                                        args: null,
                                        kind: 'ScalarField',
                                        name: 'id',
                                        storageKey: null,
                                      },
                                    ],
                                    storageKey: null,
                                  },
                                ],
                                type: 'Snapshot',
                                abstractKey: null,
                              },
                              {
                                kind: 'InlineFragment',
                                selections: [
                                  {
                                    alias: null,
                                    args: null,
                                    concreteType: 'TopLevelNodeDiff',
                                    kind: 'LinkedField',
                                    name: 'diff',
                                    plural: false,
                                    selections: [
                                      {
                                        alias: null,
                                        args: null,
                                        concreteType: 'TopLevelNode',
                                        kind: 'LinkedField',
                                        name: 'before',
                                        plural: false,
                                        selections: [
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'name',
                                            storageKey: null,
                                          },
                                          {
                                            alias: null,
                                            args: null,
                                            concreteType: 'FigmaPage',
                                            kind: 'LinkedField',
                                            name: 'page',
                                            plural: false,
                                            selections: [
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'name',
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                concreteType: 'FigmaFile',
                                                kind: 'LinkedField',
                                                name: 'file',
                                                plural: false,
                                                selections: [
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'name',
                                                    storageKey: null,
                                                  },
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'id',
                                                    storageKey: null,
                                                  },
                                                ],
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'id',
                                                storageKey: null,
                                              },
                                            ],
                                            storageKey: null,
                                          },
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'tree',
                                            storageKey: null,
                                          },
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'id',
                                            storageKey: null,
                                          },
                                        ],
                                        storageKey: null,
                                      },
                                      {
                                        alias: null,
                                        args: null,
                                        concreteType: 'TopLevelNode',
                                        kind: 'LinkedField',
                                        name: 'after',
                                        plural: false,
                                        selections: [
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'name',
                                            storageKey: null,
                                          },
                                          {
                                            alias: null,
                                            args: null,
                                            concreteType: 'FigmaPage',
                                            kind: 'LinkedField',
                                            name: 'page',
                                            plural: false,
                                            selections: [
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'name',
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                concreteType: 'FigmaFile',
                                                kind: 'LinkedField',
                                                name: 'file',
                                                plural: false,
                                                selections: [
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'name',
                                                    storageKey: null,
                                                  },
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'id',
                                                    storageKey: null,
                                                  },
                                                ],
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'id',
                                                storageKey: null,
                                              },
                                            ],
                                            storageKey: null,
                                          },
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'tree',
                                            storageKey: null,
                                          },
                                          {
                                            alias: null,
                                            args: null,
                                            kind: 'ScalarField',
                                            name: 'id',
                                            storageKey: null,
                                          },
                                        ],
                                        storageKey: null,
                                      },
                                      {
                                        alias: null,
                                        args: null,
                                        kind: 'ScalarField',
                                        name: 'id',
                                        storageKey: null,
                                      },
                                    ],
                                    storageKey: null,
                                  },
                                  {
                                    alias: null,
                                    args: null,
                                    concreteType:
                                      'MergeRequestCommentConnection',
                                    kind: 'LinkedField',
                                    name: 'comments',
                                    plural: false,
                                    selections: [
                                      {
                                        alias: null,
                                        args: null,
                                        concreteType: 'MergeRequestCommentEdge',
                                        kind: 'LinkedField',
                                        name: 'edges',
                                        plural: true,
                                        selections: [
                                          {
                                            alias: null,
                                            args: null,
                                            concreteType: 'MergeRequestComment',
                                            kind: 'LinkedField',
                                            name: 'node',
                                            plural: false,
                                            selections: [
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'createdAt',
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'body',
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                concreteType: 'Profile',
                                                kind: 'LinkedField',
                                                name: 'commentedBy',
                                                plural: false,
                                                selections: [
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'handle',
                                                    storageKey: null,
                                                  },
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'name',
                                                    storageKey: null,
                                                  },
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    concreteType: 'FileInfo',
                                                    kind: 'LinkedField',
                                                    name: 'avatar',
                                                    plural: false,
                                                    selections: [
                                                      {
                                                        alias: null,
                                                        args: null,
                                                        kind: 'ScalarField',
                                                        name: 'url',
                                                        storageKey: null,
                                                      },
                                                    ],
                                                    storageKey: null,
                                                  },
                                                  {
                                                    alias: null,
                                                    args: null,
                                                    kind: 'ScalarField',
                                                    name: 'id',
                                                    storageKey: null,
                                                  },
                                                ],
                                                storageKey: null,
                                              },
                                              {
                                                alias: null,
                                                args: null,
                                                kind: 'ScalarField',
                                                name: 'id',
                                                storageKey: null,
                                              },
                                            ],
                                            storageKey: null,
                                          },
                                        ],
                                        storageKey: null,
                                      },
                                    ],
                                    storageKey: null,
                                  },
                                ],
                                type: 'MergeRequestConversation',
                                abstractKey: null,
                              },
                              {
                                kind: 'InlineFragment',
                                selections: [
                                  {
                                    alias: null,
                                    args: null,
                                    kind: 'ScalarField',
                                    name: 'id',
                                    storageKey: null,
                                  },
                                ],
                                type: 'Node',
                                abstractKey: '__isNode',
                              },
                            ],
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: 'ScalarField',
                            name: 'id',
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'id',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
      },
      params: {
        cacheID: 'ac4c0409e26b4f8385aab5c2081d8b1b',
        id: null,
        metadata: {},
        name: 'MRVTimelineQuery',
        operationKind: 'query',
        text:
          'query MRVTimelineQuery(\n  $mergeRequestId: ID!\n) {\n  ...MRVTimeline_timelineData_4MRD8\n}\n\nfragment Avatar_profile on Profile {\n  name\n  avatar {\n    url\n  }\n}\n\nfragment ConversationComment_comment on MergeRequestComment {\n  createdAt\n  body\n  commentedBy {\n    handle\n    ...Avatar_profile\n    id\n  }\n}\n\nfragment DesignDiff_diff on TopLevelNodeDiff {\n  before {\n    name\n    page {\n      name\n      file {\n        name\n        id\n      }\n      id\n    }\n    ...TopLevelNodeRender_topLevelNode\n    id\n  }\n  after {\n    name\n    page {\n      name\n      file {\n        name\n        id\n      }\n      id\n    }\n    ...TopLevelNodeRender_topLevelNode\n    id\n  }\n}\n\nfragment MRTimelineConversation_conversation on MergeRequestConversation {\n  diff {\n    ...DesignDiff_diff\n    id\n  }\n  comments {\n    edges {\n      node {\n        ...ConversationComment_comment\n        id\n      }\n    }\n  }\n}\n\nfragment MRTimelineSnapshot_snapshot on Snapshot {\n  createdAt\n  message\n  snapshotedBy {\n    ...Avatar_profile\n    id\n  }\n}\n\nfragment MRVTimeline_timelineData_4MRD8 on Query {\n  mergeRequest(id: $mergeRequestId) {\n    events {\n      edges {\n        node {\n          event {\n            __typename\n            ...MRTimelineConversation_conversation\n            ...MRTimelineSnapshot_snapshot\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment TopLevelNodeRender_topLevelNode on TopLevelNode {\n  tree\n}\n',
      },
      hash: 'c0255046f856398e820a659bb4d4338b',
    },
    variables: {
      mergeRequestId: 'mockId',
    },
    cacheConfig: {
      force: true,
    },
  },
  root: {
    dataID: 'client:root',
    node: {
      argumentDefinitions: [
        {
          defaultValue: null,
          kind: 'LocalArgument',
          name: 'mergeRequestId',
        },
      ],
      kind: 'Operation',
      name: 'MRVTimelineQuery',
      selections: [
        {
          alias: null,
          args: [
            {
              kind: 'Variable',
              name: 'id',
              variableName: 'mergeRequestId',
            },
          ],
          concreteType: 'MergeRequest',
          kind: 'LinkedField',
          name: 'mergeRequest',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'MergeRequestEventConnection',
              kind: 'LinkedField',
              name: 'events',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'MergeRequestEventEdge',
                  kind: 'LinkedField',
                  name: 'edges',
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'MergeRequestEvent',
                      kind: 'LinkedField',
                      name: 'node',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: null,
                          kind: 'LinkedField',
                          name: 'event',
                          plural: true,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: '__typename',
                              storageKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'TopLevelNodeDiff',
                                  kind: 'LinkedField',
                                  name: 'diff',
                                  plural: false,
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'TopLevelNode',
                                      kind: 'LinkedField',
                                      name: 'before',
                                      plural: false,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'name',
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'FigmaPage',
                                          kind: 'LinkedField',
                                          name: 'page',
                                          plural: false,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'name',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType: 'FigmaFile',
                                              kind: 'LinkedField',
                                              name: 'file',
                                              plural: false,
                                              selections: [
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'name',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'id',
                                                  storageKey: null,
                                                },
                                              ],
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'id',
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'tree',
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'id',
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'TopLevelNode',
                                      kind: 'LinkedField',
                                      name: 'after',
                                      plural: false,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'name',
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'FigmaPage',
                                          kind: 'LinkedField',
                                          name: 'page',
                                          plural: false,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'name',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType: 'FigmaFile',
                                              kind: 'LinkedField',
                                              name: 'file',
                                              plural: false,
                                              selections: [
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'name',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'id',
                                                  storageKey: null,
                                                },
                                              ],
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'id',
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'tree',
                                          storageKey: null,
                                        },
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'id',
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'id',
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'MergeRequestCommentConnection',
                                  kind: 'LinkedField',
                                  name: 'comments',
                                  plural: false,
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'MergeRequestCommentEdge',
                                      kind: 'LinkedField',
                                      name: 'edges',
                                      plural: true,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'MergeRequestComment',
                                          kind: 'LinkedField',
                                          name: 'node',
                                          plural: false,
                                          selections: [
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'createdAt',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'body',
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType: 'Profile',
                                              kind: 'LinkedField',
                                              name: 'commentedBy',
                                              plural: false,
                                              selections: [
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'handle',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'name',
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  concreteType: 'FileInfo',
                                                  kind: 'LinkedField',
                                                  name: 'avatar',
                                                  plural: false,
                                                  selections: [
                                                    {
                                                      alias: null,
                                                      args: null,
                                                      kind: 'ScalarField',
                                                      name: 'url',
                                                      storageKey: null,
                                                    },
                                                  ],
                                                  storageKey: null,
                                                },
                                                {
                                                  alias: null,
                                                  args: null,
                                                  kind: 'ScalarField',
                                                  name: 'id',
                                                  storageKey: null,
                                                },
                                              ],
                                              storageKey: null,
                                            },
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'id',
                                              storageKey: null,
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                              ],
                              type: 'MergeRequestConversation',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'createdAt',
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'message',
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'Profile',
                                  kind: 'LinkedField',
                                  name: 'snapshotedBy',
                                  plural: false,
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'name',
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'FileInfo',
                                      kind: 'LinkedField',
                                      name: 'avatar',
                                      plural: false,
                                      selections: [
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'url',
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'id',
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                              ],
                              type: 'Snapshot',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'id',
                                  storageKey: null,
                                },
                              ],
                              type: 'Node',
                              abstractKey: '__isNode',
                            },
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'id',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'id',
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    variables: {
      mergeRequestId: 'mockId',
    },
  },
};
