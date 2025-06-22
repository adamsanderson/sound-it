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
    // because "recipe" is included in the `loanWordsWithFinalE` set.
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

  it('should correctly handle "science"', () => {
    const result = splitGraphemes('science');
    // 'sci', 'e', 'n', 'ce'
    expect(result).toEqual([
      { grapheme: 'sci', silent: false },
      { grapheme: 'e', silent: false },
      { grapheme: 'n', silent: false },
      { grapheme: 'ce', silent: false }, // 'ce' is a grapheme. The silent rule for 'e' does not apply as the grapheme is 'ce'.
                                      // There is no specific silent rule for 'ce', so it's not silent.
    ]);
  });

  it('should correctly handle "lamb"', () => {
    const result = splitGraphemes('lamb');
    // 'l', 'a', 'mb'
    expect(result).toEqual([
        { grapheme: 'l', silent: false },
        { grapheme: 'a', silent: false },
        { grapheme: 'mb', silent: false }, // "mb" is a grapheme. The 'b' in 'mb' is not considered silent by the 'b' rule
                                       // because graphemes[index+1] would be undefined.
    ]);
  });

});
