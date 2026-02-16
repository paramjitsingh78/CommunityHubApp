import {isValidEmail, isValidPassword} from './validators';

describe('validators', () => {
  describe('isValidEmail', () => {
    it('accepts valid emails with whitespace around input', () => {
      expect(isValidEmail('  user@example.com  ')).toBe(true);
    });

    it('rejects malformed emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('accepts passwords with trimmed length >= 6', () => {
      expect(isValidPassword(' 123456 ')).toBe(true);
    });

    it('rejects passwords with trimmed length < 6', () => {
      expect(isValidPassword(' 12345 ')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });
});
