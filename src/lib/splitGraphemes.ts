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
            silent: !!isGraphemeSilent[grapheme]?.(graphemes, i)
        }
    });
}

const loanWordsWithFinalE = new Set([
    "recipe", "apostrophe", "catastrophe", "acne", "epitome", "vigilante", "sesame", "posse",
    "karate", "anemone", "hyperbole", "coyote", "epitome",
    "cafe", "touche", "protege", "saute",
])

/**
 * These rules are for graphemes that are entirely silent.
 * For instance the "e" in "cake".
 * 
 * For graphemes like "mb" in "lamb", we return `false` since the "m" is still pronounced.
 * Another example that is pronounced is "sci" in "science".
 */
const isGraphemeSilent: Record<string, (graphemes: string[], index: number) => boolean> = {
    // Final "e", as in cake, make, and broke.
    'e': (graphemes, index) => {
        const lastGrapheme = index === graphemes.length - 1;
        const isLoanWord = loanWordsWithFinalE.has(graphemes[index])

        return lastGrapheme && !isLoanWord;
    },

    // "b" before a "t" is silent.
    'b': (graphemes, index) => (graphemes[index+1] === 't'),
}
