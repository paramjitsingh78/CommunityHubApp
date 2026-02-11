import {Post, PostDTO} from '@app/types/post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch posts for a community
 */
export const fetchCommunityPosts = async (
  communityId: number,
): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts?userId=${communityId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data: PostDTO[] = await res.json();

  return data.map(item => ({
    id: item.id.toString(),
    communityId: item.userId,
    title: item.title,
    body: item.body,
  }));
};

/**
 * Create post (mocked)
 */
export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: post.title,
      body: post.body,
      userId: Number(post.communityId),
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create post');
  }

  const dto: PostDTO = await res.json();

  return {
    id: dto.id.toString(),
    communityId: dto.userId,
    title: dto.title,
    body: dto.body,
  };
};
