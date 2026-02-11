import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchCommunities} from '@app/api/community';
import {Community} from '@app/types/community';

export const useCommunities = () => {
  return useInfiniteQuery<Community[], Error>({
    queryKey: ['communities'],
    queryFn: ({pageParam = 1}) => fetchCommunities(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};
