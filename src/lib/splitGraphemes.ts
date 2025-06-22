import { graphemeRegexp } from "./graphemes";

type GraphemeMetadata = {
    grapheme: string,
    silent: boolean,
}

export function splitGraphemes(word: string): GraphemeMetadata[] {
    const graphemes = word.match(graphemeRegexp)?.map(m => m) || [];
    return graphemes.map((grapheme, i) => {
        return {
            grapheme,
            // Pass the original word to the silent check functions
            silent: !!isGraphemeSilent[grapheme]?.(graphemes, i, word)
        }
    });
}

const loanwordsWithFinalE = new Set([
    'acne', 'adobe', 'anemone', 'anime', 'apostrophe', 'cafe', 'catastrophe', 
    'coyote', 'epitome', 'epitome', 'finale', 'forte', 'hyperbole', 'karate', 
    'posse', 'posse', 'protege', 'recipe', 'sake', 'saute', 'sesame', 'touche', 
    'vigilante'
])

/**
 * These rules are for graphemes that are entirely silent.
 * For instance the "e" in "cake".
 * 
 * For graphemes like "mb" in "lamb", we return `false` since the "m" is still pronounced.
 * Another example is the "c" in "science", which is silent, but its grapheme is not, likewise with the "e"
 * in the final "ce" grapheme.
 */
const isGraphemeSilent: Record<string, (graphemes: string[], index: number, word: string) => boolean> = {
    // Final "e", as in cake, make, and broke.
    'e': (graphemes, index, word) => {
        const lastGrapheme = index === graphemes.length - 1;
        // Check if the original word is in the loanWordsWithFinalE set
        const isLoanWord = loanwordsWithFinalE.has(word)

        return lastGrapheme && !isLoanWord;
    },

    // "b" before a "t" is silent.
    // Add 'word' to signature even if not used, for consistency.
    'b': (graphemes, index) => (graphemes[index + 1] === 't'),
}
