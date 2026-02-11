import {CreatePostInput, Post} from '@app/types/post';

export const fetchCommunityPosts = async (
  communityId: number,
): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${communityId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch community posts');
  }

  const data = await response.json();

  return data.map((item: any) => ({
    id: String(item.id),
    communityId: item.userId,
    title: item.title,
    body: item.body,
  }));
};

export const createPost = async (input: CreatePostInput): Promise<Post> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: input.communityId,
      title: input.title,
      body: input.body,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create post');
  }

  const data = await res.json();

  return {
    id: data.id,
    communityId: input.communityId,
    title: data.title,
    body: data.body,
  };
};
