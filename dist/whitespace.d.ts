import { Editor, Path } from 'slate';
/**
 * Normalize white space in a node.
 *
 * White space codepoints in Unicode can be roughly divided into four categories
 * spacing marks, non-breaking spacing marks, zero-width marks, and line breaks.
 *
 * Spacing marks are codepoints used (usually) to separate words. As of Unicode
 * 12.1 those are: U+0009 CHARACTER TABULATION, U+0020 SPACE, U+1680 OGHAM SPACE
 * MARK, U+2000 EN QUAD, U+2001 EM QUAD, U+2002 EN SPACE, U+2003 EM SPACE,
 * U+2004 THREE-PER-EM SPACE, U+2005 FOUR-PER-EM SPACE, U+2006 SIX-PER-EM SPACE,
 * U+2008 PUNCTUATION SPACE, U+2009 THIN SPACE, U+200A HAIR SAPCE, U+205F MEDIUM
 * MATHEMATICAL SPACE, and U+3000 IDEOGRAPHIC SPACE.
 *
 * Non-breaking spacing marks are spacing marks which prevent line breaks from
 * being inserted. As of Unicode 12.1 those are: U+00A0 NO-BREAK SPACE,
 * U+2007 FIGURE SPACE, and U+202F NARROW NO-BREAK SPACE.
 *
 * Zero-width marks are codepoints which themselves do not impact spacing
 * between words (hence zero-width), but affect spacing and rendering in other
 * ways. As of Unicode 12.1 those are: U+180E MONGOLIAN VOWEL SEPARATOR,
 * U+200B ZERO WIDTH SPACE, U+200C ZERO WIDTH NON-JOINER, U+200D ZERO WIDTH
 * JOINER, U+2060 WORD JOINER, and U+FEFF ZERO WIDTH NON-BREAKING SPACE.
 *
 * Line breaks are codepoints which introduce a line break. As of Unicode 12.1
 * those are: U+000A LINE FEED, U+000B LINE TABULATION, U+000C FORM FEED,
 * U+000D CARRAGE RETURN, U+0085 NEXT LINE, U+2028 LINE SEPARATOR, and
 * U+2029 PARAGRAPH SEPARATOR.
 *
 * White space normalization is done in steps:
 *
 * 1.  First all spacing marks and line breaks are changed into U+0020 SPACE,
 *     all non-breaking spacing marks into U+00A0 NO-BREAK SPACE, and U+FEFF
 *     ZERO WIDTH NON-BREAKING SPACE into U+2060 WORD JOINER. The exception to
 *     this are U+1680 OGHAM SPACE MARK and U+3000 IDEOGRAPHIC SPACE which are
 *     left unchanged.
 *
 * 2.  Next, all zero-width marks neighbouring a spacing mark are removed.
 *
 * 3.  Next, sequences consisting of a single white space codepoint are
 *     collapsed into a single codepoint.
 *
 * 4.  Next, all spacing marks neighbouring U+1680 OGHAM SPACE MARK or
 *     U+3000 IDEOGRAPHIC SPACE are removed.
 *
 * 5.  Next, all spacing marks neighbouring a non-breaking spacing mark are
 *     removed.
 *
 * 6.  Next, if there still are sequences of white spaces, only their first code
 *     point is retained.
 *
 * 7.  Finally, white space is stripped from beginning and end of nodes, and
 *     end points of marks and inlines are adjusted so that they don't begin or
 *     end with white spaces.
 *
 * Note that this is a conceptual description, and the actual implementation may
 * differ slightly (for example it performs step 7 first).
 */
export default function normalizeWhiteSpace(editor: Editor, at: Path): void;
/** Merge any subsequent text elements sharing same properties */
export declare function collapseAdjacentText(editor: Editor, at: Path): void;
