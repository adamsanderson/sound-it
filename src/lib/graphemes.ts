import { sortByLengthDesc, unique } from "./utils";

export const graphemeToPhoneme = {
    // Consonants
    b: { ipa: 'b', graphemes: ['b', 'bb'], voiced: true },
    d: { ipa: 'd', graphemes: ['d', 'dd', 'ed'], voiced: true },
    f: { ipa: 'f', graphemes: ['f', 'ff', 'ph', 'gh', 'lf', 'ft'], voiced: false },
    g: { ipa: 'g', graphemes: ['g', 'gg', 'gh', 'gu', 'gue'], voiced: true },
    h: { ipa: 'h', graphemes: ['h', 'wh'], voiced: false },
    j: { ipa: 'dʒ', graphemes: ['j', 'ge', 'g', 'dge', 'di', 'gg'], voiced: true },
    k: { ipa: 'k', graphemes: ['k', 'c', 'ch', 'cc', 'lk', 'qu', 'q', 'ck', 'x'], voiced: false },
    l: { ipa: 'l', graphemes: ['l', 'll'], voiced: true },
    m: { ipa: 'm', graphemes: ['m', 'mm', 'mb', 'mn', 'lm'], voiced: true },
    n: { ipa: 'n', graphemes: ['n', 'nn', 'kn', 'gn', 'pn', 'mn'], voiced: true },
    p: { ipa: 'p', graphemes: ['p', 'pp'], voiced: false },
    r: { ipa: 'r', graphemes: ['r', 'rr', 'wr', 'rh'], voiced: true },
    s: { ipa: 's', graphemes: ['s', 'ss', 'c', 'sc', 'ps', 'st', 'ce', 'se'], voiced: false },
    t: { ipa: 't', graphemes: ['t', 'tt', 'th', 'ed'], voiced: false },
    v: { ipa: 'v', graphemes: ['v', 'f', 'ph', 've'], voiced: true },
    w: { ipa: 'w', graphemes: ['w', 'wh', 'u', 'o'], voiced: true },
    z: { ipa: 'z', graphemes: ['z', 'zz', 's', 'ss', 'x', 'ze', 'se'], voiced: true },
    zh: { ipa: 'ʒ', graphemes: ['s', 'si', 'z'], voiced: true },
    ch: { ipa: 'tʃ', graphemes: ['ch', 'tch', 'tu', 'te'], voiced: false },
    sh: { ipa: 'ʃ', graphemes: ['sh', 'ce', 's', 'ci', 'si', 'ch', 'sci', 'ti'], voiced: false },
    th_unvoiced: { ipa: 'θ', graphemes: ['th'], voiced: false },
    th_voiced: { ipa: 'ð', graphemes: ['th'], voiced: true },
    ng: { ipa: 'ŋ', graphemes: ['ng', 'n', 'ngue'], voiced: true },
    y_consonant: { ipa: 'j', graphemes: ['y', 'i', 'j'], voiced: true },

    // Vowels & Diphthongs
    ae: { ipa: 'æ', graphemes: ['a', 'ai', 'au'] },
    ei: { ipa: 'eɪ', graphemes: ['a', 'ai', 'eigh', 'aigh', 'ay', 'er', 'et', 'ei', 'au', 'a_e', 'ea', 'ey'] },
    eh: { ipa: 'ɛ', graphemes: ['e', 'ea', 'u', 'ie', 'ai', 'a', 'eo', 'ei', 'ae'] },
    ee: { ipa: 'i:', graphemes: ['e', 'ee', 'ea', 'y', 'ey', 'oe', 'ie', 'i', 'ei', 'eo', 'ay'] },
    ih: { ipa: 'ɪ', graphemes: ['i', 'e', 'o', 'u', 'ui', 'y', 'ie'] },
    ai: { ipa: 'aɪ', graphemes: ['i', 'y', 'igh', 'ie', 'uy', 'ye', 'ai', 'is', 'eigh', 'i_e'] },
    aw: { ipa: 'ɒ', graphemes: ['a', 'ho', 'au', 'aw', 'ough'] },
    ow: { ipa: 'oʊ', graphemes: ['o', 'oa', 'o_e', 'oe', 'ow', 'ough', 'eau', 'oo', 'ew'] },
    uh: { ipa: 'ʊ', graphemes: ['o', 'oo', 'u', 'ou'] },
    ah: { ipa: 'ʌ', graphemes: ['u', 'o', 'oo', 'ou'] },
    oo_long: { ipa: 'u:', graphemes: ['o', 'oo', 'ew', 'ue', 'u_e', 'oe', 'ough', 'ui', 'oew', 'ou'] },
    oi: { ipa: 'ɔɪ', graphemes: ['oi', 'oy', 'uoy'] },
    ow2: { ipa: 'aʊ', graphemes: ['ow', 'ou', 'ough'] },
    schwa: { ipa: 'ə', graphemes: ['a', 'er', 'i', 'ar', 'our', 'ur'] },
    air: { ipa: 'eəʳ', graphemes: ['air', 'are', 'ear', 'ere', 'eir', 'ayer'] },
    ar: { ipa: 'ɑ:', graphemes: ['a'] },
    er_r: { ipa: 'ɜ:ʳ', graphemes: ['ir', 'er', 'ur', 'ear', 'or', 'our', 'yr'] },
    or_long: { ipa: 'ɔ:', graphemes: ['aw', 'a', 'or', 'oor', 'ore', 'oar', 'our', 'augh', 'ar', 'ough', 'au'] },
    ear1: { ipa: 'ɪəʳ', graphemes: ['ear', 'eer', 'ere', 'ier'] },
    ure: { ipa: 'ʊəʳ', graphemes: ['ure', 'our'] },

    // Special Cases
    //
    // "Sch" as in School
    // "Sk" as in Skate
    sch: { ipa: 'sk', graphemes: ['sch', 'sk'] },
};

// All graphemes sorted by length (longest first)
const allGraphemes = Object.values(graphemeToPhoneme)
    .flatMap((phoneme) => phoneme.graphemes.filter(noPatternPredicate) || []);

/**
 * A regular expression matching graphemes.
 * Longer ones will match first, so `eigh` will match instead of `e` if possible.
 */
export const graphemeRegexp = new RegExp(
    unique(allGraphemes)
        .sort(sortByLengthDesc)
        .join('|'),
    'ig');

// The graphemes above include patterns like `a_e`.  This is useful for matching phenomes,
// but not essential for splitting.
function noPatternPredicate(g: string) {
    return !g.includes('_');
}