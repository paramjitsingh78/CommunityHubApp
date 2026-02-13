import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {CommunityStackParamList} from '@app/navigation/types';
import {AppScreen} from '@app/components/layout/AppScreen';
import {Loader} from '@app/components/ui/Loader';

import {useCommunityDetails} from '@app/hooks/useCommunityDetails';
import {useCommunityPosts} from '@app/hooks/useCommunityPosts';
import {useCreatePost} from '@app/hooks/useCreatePost';
import {useCommunityStore} from '@app/store/communityStore';
import {useNetworkStatus} from '@app/hooks/useNetworkStatus';

import {CreatePostBox} from '@app/components/posts/CreatePostBox';
import {PostCard} from '@app/components/posts/PostCard';
import {Post} from '@app/types/post';

type Props = NativeStackScreenProps<
  CommunityStackParamList,
  'CommunityDetails'
>;

export const CommunityDetailsScreen = ({route}: Props) => {
  const {communityId} = route.params;

  const {isOnline} = useNetworkStatus();

  const {data: community, isLoading: detailsLoading} =
    useCommunityDetails(communityId);

  const {data: posts, isLoading: postsLoading} = useCommunityPosts(communityId);

  const createPost = useCreatePost();

  const {join, leave, isJoined} = useCommunityStore();
  const joined = isJoined(communityId);

  if (detailsLoading || postsLoading) {
    return <Loader fullscreen />;
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Community Info */}
        <Text style={styles.title}>{community?.title}</Text>
        <Text style={styles.status}>
          Status: {community?.completed ? 'Active' : 'Inactive'}
        </Text>

        {/* Join / Leave */}
        <Pressable
          style={[styles.joinButton, joined ? styles.leave : styles.join]}
          onPress={() => (joined ? leave(communityId) : join(communityId))}>
          <Text style={styles.joinText}>
            {joined ? 'Leave Community' : 'Join Community'}
          </Text>
        </Pressable>

        {/* Create Post */}
        <CreatePostBox
          disabled={!isOnline || createPost.isLoading}
          loading={createPost.isLoading}
          onSubmit={(title, body) =>
            createPost.mutate({
              communityId,
              title,
              body,
            })
          }
        />

        {/* Posts */}
        <FlatList<Post>
          data={posts ?? []}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({item}) => <PostCard post={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No posts yet. Be the first to post!
            </Text>
          }
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  joinButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  join: {
    backgroundColor: '#2e7d32',
  },
  leave: {
    backgroundColor: '#c62828',
  },
  joinText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 24,
  },
});
