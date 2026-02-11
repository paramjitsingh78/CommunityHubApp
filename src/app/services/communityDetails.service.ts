import {Community} from '@app/types/community';
import {Post} from '@app/types/post';

const posts: Post[] = Array.from({length: 40}).map((_, index) => ({
  id: String(index + 1),
  communityId: String((index % 5) + 1),
  title: `Post ${index + 1}`,
  body: `Post content ${index + 1}`,
}));

export const fetchCommunityDetails = async (
  communityId: string,
): Promise<Community> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    id: communityId,
    name: `Community ${communityId}`,
    description: `Description for community ${communityId}`,
    memberCount: 1200,
    isJoined: false,
  };
};

export const fetchCommunityPosts = async (
  communityId: string,
): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return posts.filter(p => p.communityId === communityId);
};
