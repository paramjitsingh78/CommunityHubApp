import {
  createPost,
  fetchCommunities,
  fetchCommunityDetails,
  fetchCommunityPosts,
} from './community';

type MockResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

describe('community api', () => {
  const fetchMock = jest.fn();

  beforeAll(() => {
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('maps communities response', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        {id: 7, title: 'React Fans', body: 'All about RN'},
        {id: 8, title: 'TS Group', body: 'Type safety'},
      ],
    } as MockResponse);

    const result = await fetchCommunities(2);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=2',
    );
    expect(result).toEqual([
      {
        id: 7,
        name: 'React Fans',
        description: 'All about RN',
        memberCount: 251,
      },
      {
        id: 8,
        name: 'TS Group',
        description: 'Type safety',
        memberCount: 251,
      },
    ]);
  });

  it('throws when fetching communities fails', async () => {
    fetchMock.mockResolvedValue({ok: false} as MockResponse);

    await expect(fetchCommunities(1)).rejects.toThrow(
      'Failed to fetch communities',
    );
  });

  it('returns community details', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({id: 10, title: 'Details', completed: true}),
    } as MockResponse);

    const result = await fetchCommunityDetails(10);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/10',
    );
    expect(result).toEqual({id: 10, title: 'Details', completed: true});
  });

  it('maps community posts response', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        {id: 1, userId: 3, title: 'First', body: 'Body 1'},
        {id: 2, userId: 3, title: 'Second', body: 'Body 2'},
      ],
    } as MockResponse);

    const result = await fetchCommunityPosts(3);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts?userId=3',
    );
    expect(result).toEqual([
      {id: '1', communityId: 3, title: 'First', body: 'Body 1'},
      {id: '2', communityId: 3, title: 'Second', body: 'Body 2'},
    ]);
  });

  it('creates post and falls back to Date.now id when API id is missing', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(123456);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({userId: 9, title: 'Hello', body: 'World'}),
    } as MockResponse);

    const result = await createPost(9, 'Hello', 'World');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: 'Hello', body: 'World', userId: 9}),
      },
    );
    expect(result).toEqual({
      id: '123456',
      communityId: 9,
      title: 'Hello',
      body: 'World',
    });
  });

  it('throws when creating post fails', async () => {
    fetchMock.mockResolvedValue({ok: false} as MockResponse);

    await expect(createPost(1, 'a', 'b')).rejects.toThrow('Failed to create post');
  });
});
