import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Post} from '@app/types/post';

type Props = {
  post: Post;
};

export const PostCard = ({post}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  body: {
    color: '#444',
  },
});
