import {useQuery} from '@tanstack/react-query';
import {fetchCommunityPosts} from '@app/api/community';
import {Post} from '@app/types/post';

export const useCommunityPosts = (communityId: number) => {
  return useQuery<Post[], Error>({
    queryKey: ['community-posts', communityId],
    queryFn: () => fetchCommunityPosts(communityId),
    enabled: communityId > 0, // only run when id is valid
    staleTime: 1000 * 60 * 2, // 2 minutes (optional)
  });
};
