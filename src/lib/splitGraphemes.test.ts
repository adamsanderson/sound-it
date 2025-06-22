import { describe, it, expect } from 'vitest';
import { splitGraphemes } from './splitGraphemes';

describe('splitGraphemes', () => {
  it('should split a simple word into graphemes', () => {
    const result = splitGraphemes('hello');
    expect(result).toEqual([
      { grapheme: 'h', silent: false },
      { grapheme: 'e', silent: false },
      { grapheme: 'll', silent: false }, // 'll' is a single grapheme
      { grapheme: 'o', silent: false },
    ]);
  });

  it('should identify silent "e" at the end of a word', () => {
    const result = splitGraphemes('cake');
    expect(result).toEqual([
      { grapheme: 'c', silent: false },
      { grapheme: 'a', silent: false },
      { grapheme: 'k', silent: false },
      { grapheme: 'e', silent: true },
    ]);
  });

  it('should identify silent "b" before "t"', () => {
    const result = splitGraphemes('debt');
    expect(result).toEqual([
      { grapheme: 'd', silent: false },
      { grapheme: 'e', silent: false },
      { grapheme: 'b', silent: true },
      { grapheme: 't', silent: false },
    ]);
  });

  it('should not mark final "e" as silent in loanwords like "recipe"', () => {
    const result = splitGraphemes('recipe');
    // This test verifies that the final 'e' in "recipe" is not considered silent
    // because "recipe" is included in the `loanwordsWithFinalE` set.
    expect(result).toEqual([
      { grapheme: 'r', silent: false },
      { grapheme: 'e', silent: false },
      { grapheme: 'ci', silent: false }, // 'ci' is a grapheme
      { grapheme: 'p', silent: false },
      { grapheme: 'e', silent: false }, // final 'e' in "recipe" is correctly NOT silent due to loan word rule
    ]);
  });

  it('should handle empty strings', () => {
    const result = splitGraphemes('');
    expect(result).toEqual([]);
  });

  it('should handle strings with only spaces', () => {
    // Current graphemeRegexp does not match spaces, so splitGraphemes returns an empty array.
    const result = splitGraphemes('   ');
    expect(result).toEqual([]);
  });

  it('should ignore numbers and symbols', () => {
    const result = splitGraphemes('hello1!@?é');
    expect(result).toEqual([
      { grapheme: 'h', silent: false },
      { grapheme: 'e', silent: false },
      { grapheme: 'll', silent: false }, // 'll' is a single grapheme
      { grapheme: 'o', silent: false },
    ]);
  });

  it('should handle words with mixed silent and non-silent graphemes', () => {
    const result = splitGraphemes('subtle');
    expect(result).toEqual([
      { grapheme: 's', silent: false },
      { grapheme: 'u', silent: false },
      { grapheme: 'b', silent: true },
      { grapheme: 't', silent: false },
      { grapheme: 'l', silent: false },
      { grapheme: 'e', silent: true },
    ]);
  });

  it('only graphemes that are entirely silent should be marked silent', () => {
    const result = splitGraphemes('science');
    expect(result).toEqual([
      { grapheme: 'sci', silent: false },
      { grapheme: 'e', silent: false },
      { grapheme: 'n', silent: false },
      { grapheme: 'ce', silent: false }, // The 'ce' grapheme is not silent.
    ]);
  });

  it('should correctly handle "lamb"', () => {
    const result = splitGraphemes('lamb');
    expect(result).toEqual([
      { grapheme: 'l', silent: false },
      { grapheme: 'a', silent: false },
      { grapheme: 'mb', silent: false }, // The "mb" grapheme is not silent.
    ]);
  });

});
