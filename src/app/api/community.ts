import {Community} from '@app/types/community';
import {Post} from '@app/types/post';

export type CommunityDetails = {
  id: number;
  title: string;
  completed: boolean;
};

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
 * Community posts (mapped from /posts?userId=:id)
 */
export const fetchCommunityPosts = async (
  communityId: number,
): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${communityId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch community posts');
  }

  return response.json();
};
