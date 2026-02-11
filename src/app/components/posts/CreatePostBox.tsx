import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onSubmit: (title: string, body: string) => void;
};

export const CreatePostBox = ({disabled, loading, onSubmit}: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handlePost = () => {
    if (!title.trim() || !body.trim()) {
      return;
    }

    onSubmit(title.trim(), body.trim());
    setTitle('');
    setBody('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Post title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Write something..."
        value={body}
        onChangeText={setBody}
        style={[styles.input, styles.bodyInput]}
        multiline
      />

      <Pressable
        style={[styles.button, disabled && {opacity: 0.6}]}
        disabled={disabled}
        onPress={handlePost}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Post</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  bodyInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
