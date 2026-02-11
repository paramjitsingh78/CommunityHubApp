import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useJoinCommunity = (communityId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return true;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({queryKey: ['community', communityId]});

      const previous = queryClient.getQueryData(['community', communityId]);

      queryClient.setQueryData(
        ['community', communityId],
        (old: any) =>
          old && {
            ...old,
            isJoined: !old.isJoined,
            memberCount: old.isJoined
              ? old.memberCount - 1
              : old.memberCount + 1,
          },
      );

      return {previous};
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['community', communityId], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', communityId],
      });
    },
  });
};
