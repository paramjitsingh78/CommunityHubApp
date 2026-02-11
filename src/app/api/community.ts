import {Community} from '@app/types/community';
import {Post, PostDTO} from '@app/types/post';

export type CommunityDetails = {
  id: number;
  title: string;
  completed: boolean;
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch community list (mapped from posts API)
 */
export const fetchCommunities = async (page: number): Promise<Community[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch communities');
  }

  const data = await response.json();

  return data.map((item: any) => ({
    id: item.id, // number
    name: item.title,
    description: item.body,
    memberCount: Math.floor(Math.random() * 500) + 1,
  }));
};

/**
 * Community details (mapped from /todos/:id)
 */
export const fetchCommunityDetails = async (
  id: number,
): Promise<CommunityDetails> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch community details');
  }

  return response.json();
};

/**
 * Fetch posts for a community (maps JSONPlaceholder posts -> Post)
 */
export const fetchCommunityPosts = async (
  communityId: number,
): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts?userId=${communityId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch community posts');
  }
  const data: PostDTO[] = await res.json();
  return data.map(d => ({
    id: d.id.toString(),
    communityId: d.userId,
    title: d.title,
    body: d.body,
  }));
};

/**
 * Create a post (POST). JSONPlaceholder returns a created object with id.
 * We map it to our Post type.
 */
export const createPost = async (
  communityId: number,
  title: string,
  body: string,
): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title,
      body,
      userId: communityId,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create post');
  }

  const data: PostDTO = await res.json();

  // JSONPlaceholder returns id as number — map to our Post
  return {
    id: data.id ? data.id.toString() : Date.now().toString(),
    communityId: data.userId,
    title: data.title,
    body: data.body,
  };
};
