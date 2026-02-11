import {useQuery} from '@tanstack/react-query';
import {
  fetchCommunityDetails,
  CommunityDetails,
  fetchCommunityPosts,
} from '@app/api/community';
import {Post} from '@app/types/post';

export const useCommunityDetails = (id: number) => {
  return useQuery<CommunityDetails>({
    queryKey: ['community-details', id],
    queryFn: () => fetchCommunityDetails(id),
    enabled: Number.isFinite(id),
  });
};

export const useCommunityPosts = (communityId: number) => {
  return useQuery<Post[]>({
    queryKey: ['community-posts', communityId],
    queryFn: () => fetchCommunityPosts(communityId),
    enabled: Number.isFinite(communityId),
  });
};
