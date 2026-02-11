import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    color: '#555555',
  },
  meta: {
    marginTop: 8,
    fontSize: 12,
    color: '#888888',
  },
  footer: {
    textAlign: 'center',
    paddingVertical: 16,
  },
});
