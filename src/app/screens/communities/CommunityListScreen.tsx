import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useCommunities} from '@app/hooks/useCommunities';
import {AppScreen} from '@app/components/layout/AppScreen';
import {Loader} from '@app/components/ui/Loader';
import {CommunityStackParamList} from '@app/navigation/types';

type NavigationProp = NativeStackNavigationProp<
  CommunityStackParamList,
  'CommunityList'
>;

export const CommunityListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    data,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunities();

  const communities = data?.pages.flat() ?? [];

  if (isLoading) {
    return <Loader fullscreen />;
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Find your people</Text>

        <FlatList
          data={communities}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshing={isRefetching}
          onRefresh={refetch}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footerLoader} />
            ) : null
          }
          renderItem={({item}) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate('CommunityDetails', {
                  communityId: item.id,
                })
              }>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.members}>{item.memberCount} members</Text>
            </Pressable>
          )}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subtitle: {
    color: '#666',
    marginHorizontal: 16,
    paddingTop: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
  },
  members: {
    fontSize: 12,
    color: '#888888',
  },
  footerLoader: {
    marginVertical: 16,
  },
});
