import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStackParamList} from '@app/navigation/types';
import {AppScreen} from '@app/components/layout/AppScreen';
import {Loader} from '@app/components/ui/Loader';
import {useCommunityDetails} from '@app/hooks/useCommunityDetails';
import {useCommunityPosts} from '@app/hooks/useCommunityPosts';
import {useCommunityStore} from '@app/store/communityStore';

type Props = NativeStackScreenProps<
  CommunityStackParamList,
  'CommunityDetails'
>;

export const CommunityDetailsScreen = ({route}: Props) => {
  const {communityId} = route.params;

  const {data: community, isLoading: detailsLoading} = useCommunityDetails(
    Number(communityId),
  );

  const {data: postsData, isLoading: postsLoading} = useCommunityPosts(
    Number(communityId),
  );

  const {join, leave, isJoined} = useCommunityStore();

  const joined = isJoined(Number(communityId));

  const [postText, setPostText] = useState('');
  const [localPosts, setLocalPosts] = useState<any[]>([]);

  const posts = [...localPosts, ...(postsData ?? [])];

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
          onPress={() =>
            joined ? leave(Number(communityId)) : join(Number(communityId))
          }>
          <Text style={styles.joinText}>
            {joined ? 'Leave Community' : 'Join Community'}
          </Text>
        </Pressable>

        {/* Create Post */}
        <View style={styles.createPost}>
          <TextInput
            placeholder="Write a post..."
            value={postText}
            onChangeText={setPostText}
            style={styles.input}
          />
          <Pressable
            style={styles.postButton}
            onPress={() => {
              if (!postText.trim()) return;

              setLocalPosts(prev => [
                {
                  id: Date.now(),
                  title: 'New Post',
                  body: postText,
                },
                ...prev,
              ]);
              setPostText('');
            }}>
            <Text style={styles.postButtonText}>Post</Text>
          </Pressable>
        </View>

        {/* Posts */}
        <FlatList
          data={posts}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{paddingBottom: 24}}
          renderItem={({item}) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody}>{item.body}</Text>
            </View>
          )}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
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
  createPost: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  postButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  postTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  postBody: {
    color: '#444',
  },
});
