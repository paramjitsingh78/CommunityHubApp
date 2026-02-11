import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createPost} from '@app/api/community';
import {CreatePostInput, Post} from '@app/types/post';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostInput, {previous?: Post[]}>({
    mutationFn: ({communityId, title, body}) =>
      createPost(communityId, title, body),

    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: ['community-posts', variables.communityId],
      });

      const previous = queryClient.getQueryData<Post[]>([
        'community-posts',
        variables.communityId,
      ]);

      const optimisticPost: Post = {
        id: `temp-${Date.now()}`,
        communityId: variables.communityId,
        title: variables.title,
        body: variables.body,
      };

      queryClient.setQueryData<Post[]>(
        ['community-posts', variables.communityId],
        old => [optimisticPost, ...(old ?? [])],
      );

      __DEV__ && console.log('Optimistic post added', optimisticPost);

      return {previous};
    },

    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        ['community-posts', variables.communityId],
        context?.previous,
      );
    },

    // onSettled: (_data, _error, variables) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['community-posts', variables.communityId],
    //   });
    // },
  });
};
