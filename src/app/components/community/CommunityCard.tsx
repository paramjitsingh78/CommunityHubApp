import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Community} from '@app/types/community';

type Props = {
  community: Community;
};

export const CommunityCard = memo(({community}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{community.name}</Text>
      <Text style={styles.description}>{community.description}</Text>
      <Text style={styles.members}>{community.memberCount} members</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    color: '#4B5563',
  },
  members: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
});
