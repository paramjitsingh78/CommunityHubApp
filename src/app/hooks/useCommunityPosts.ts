import {useQuery} from '@tanstack/react-query';
import {fetchCommunityPosts, Post} from '@app/api/communityApi';

export const useCommunityPosts = (communityId: number) => {
  return useQuery<Post[]>({
    queryKey: ['community-posts', communityId],
    queryFn: () => fetchCommunityPosts(communityId),
    enabled: !!communityId,
  });
};
