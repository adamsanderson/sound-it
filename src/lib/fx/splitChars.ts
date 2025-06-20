// Copied from: 
// https://github.com/danielpetho/fancy/blob/c1e3940155fe9341ef695a4120365193f16a91f5/src/fancy/components/text/vertical-cut-reveal.tsx#L73C5-L80C6
export const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
        return Array.from(segmenter.segment(text), ({ segment }) => segment)
    }
    // Fallback for browsers that don't support Intl.Segmenter
    return Array.from(text)
}