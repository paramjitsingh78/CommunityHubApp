import React, {useMemo, useState} from 'react';
import {View, TextInput, Pressable, Text, StyleSheet} from 'react-native';
import {Loader} from '../ui/Loader';
import {COLORS} from '@app/theme/colors';

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onSubmit: (title: string, body: string) => void;
};

export const CreatePostBox = ({disabled, loading, onSubmit}: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const isValid = useMemo(() => {
    return title.trim().length > 0 && body.trim().length > 0;
  }, [title, body]);
  const isButtonDisabled = disabled || !isValid;

  const handlePost = () => {
    if (!isValid || loading) {
      return;
    }
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
        placeholderTextColor={COLORS.placeholder}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Write something..."
        value={body}
        placeholderTextColor={COLORS.placeholder}
        onChangeText={setBody}
        style={[styles.input, styles.bodyInput]}
        multiline
      />

      <Pressable
        disabled={isButtonDisabled}
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handlePost}>
        {loading ? <Loader /> : <Text style={styles.buttonText}>Post</Text>}
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
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
