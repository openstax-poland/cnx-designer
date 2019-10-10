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
export function normalizeWhiteSpace(nodes) {
    if (!(nodes instanceof Array)) {
        return {
            ...nodes,
            nodes: normalizeWhiteSpace(nodes.nodes),
        }
    }

    adjustWS(nodes)
    replaceWS(nodes)

    return nodes
}

/**
 * Adjust marks and inlines so that they don't start or end with white space.
 *
 * This function performs the 7th step of white space normalization.
 */
function adjustWS(node) {
    if (!(node instanceof Array)) {
        if (node.object === 'text' && node.marks && node.marks.length > 0) {
            const m = node.text.match(/^(\s*)(.+?)(\s*)$/su)
            node.text = m[2]
            return [m[1], m[3]]
        }

        if (node.object === 'text') {
            return []
        }

        return adjustWS(node.nodes)
    }

    for (let i=0 ; i<node.length ; ++i) {
        const prev = node[i - 1]
        const child = node[i]
        const next = node[i + 1]

        const [before, after] = adjustWS(child)

        if (after) {
            if (next && next.object === 'text') {
                next.text = after + next.text
            } else {
                node.splice(i + 1, {
                    object: 'text',
                    text: after,
                })
            }
        }

        if (before) {
            if (prev && prev.object === 'text') {
                prev.text += before
            } else {
                node.splice(i, {
                    object: 'text',
                    text: before,
                })
                i += 1
            }
        }
    }

    let before, after

    const first = node[0]

    if (first && first.object === 'text') {
        const m = first.text.match(/^\s+/u)

        if (m !== null) {
            before = m[0]
            first.text = first.text.slice(before.length)
        }
    } else if (first) {
        const [b, a] = adjustWS(first)
        before = b

        if (a) {
            if (node[1] && node[1].object === 'text') {
                node[1].text = a + node[1].text
            } else {
                node.splice(1, 0, {
                    object: 'text',
                    text: a,
                })
            }
        }
    }

    const last = node[node.length - 1]
    const lastlast = node[node.length - 2]

    if (last && last.object === 'text') {
        const m = last.text.match(/\s+$/u)

        if (m !== null) {
            after = m[0]
            last.text = last.text.slice(0, m.index)
        }
    } else if (last) {
        const [b, a] = adjustWS(last)
        after = a

        if (b) {
            if (lastlast && lastlast.object === 'text') {
                lastlast.text += b
            } else {
                node.splice(node.length - 1, 0, {
                    object: 'text',
                    text: b,
                })
            }
        }
    }

    for (let i=0 ; i<node.length ; ++i) {
        if (node[i].object === 'text' && node[i].text.length === 0) {
            node.splice(i, 1)
            i -= 1
        }
    }

    return [before, after]
}

/**
 * Simplify white space by replacing certain groups of code points with a single
 * codepoint.
 *
 * This function performs steps 1 through 6, assuming that step 7 has already
 * been performed.
 */
function replaceWS(node) {
    if (node instanceof Array) {
        for (const child of node) {
            replaceWS(child)
        }

        return undefined
    }

    // no-misleading-character-class warns against using sequences of joining
    // codepoints as they look like a single character but will be matched
    // separately. Here this is exactly what we want, so we can safely disable
    // this lint.
    /* eslint-disable no-misleading-character-class, max-len */
    if (typeof node === 'string') {
        // 1st step
        return node.replace(/\s/gu, replaceWSChar)
            // 2nd step
            .replace(/\s[\u180e\u200b\u200c\u200d\u2060]/g, c => c[0])
            .replace(/[\u180e\u200b\u200c\u200d\u2060]\s/g, c => c[1])
            // 3rd step
            .replace(/[\s\u180e\u200b\u200c\u200d\u2060]{2,}/g, collapseWSSequence)
            // 4th step
            .replace(/[\u0020\u2000-\u2006\u2008\u2009\u200A\u205F]+([\u1680\u3000])/g, (_, r) => r)
            .replace(/([\u1680\u3000][\u0020\u2000-\u2006\u2008\u2009\u200A\u205F]+)/g, (_, r) => r)
            // 5th step
            .replace(/[\u0020\u1680\u2000-\u2006\u2008\u2009\u200A\u205F\u3000]+([\u00a0])/g, (_, r) => r)
            .replace(/([\u00a0][\u0020\u1680\u2000-\u2006\u2008\u2009\u200A\u205F\u3000]+)/g, (_, r) => r)
            // 6th step
            .replace(/[\s\u180e\u200b\u200c\u200d\u2060]{2,}/g, c => c[0])
    }
    /* eslint-enable no-misleading-character-class, max-len */

    switch (node.object) {
    case 'text':
        node.text = replaceWS(node.text)
        break

    case 'document':
    case 'block':
    case 'inline':
        replaceWS(node.nodes)
        break

    default:
        throw new Error(
            `replaceWS called on an unsupported node type: ${node.object}`)
    }

    return undefined
}

function replaceWSChar(char) {
    return {
        '\u0009': ' ', // CHARACTER TABULATION
        '\u000a': ' ', // LINE FEED
        '\u000b': ' ', // LINE TABULATION
        '\u000c': ' ', // FORM FEED
        '\u000d': ' ', // CARRAGE RETURN
        '\u0085': ' ', // NEXT LINE
        '\u2000': ' ', // EN QUAD
        '\u2001': ' ', // EM QUAD
        '\u2002': ' ', // EN SPACE
        '\u2003': ' ', // EM SPACE
        '\u2004': ' ', // THREE-PER-EM SPACE
        '\u2005': ' ', // FOUR-PER-EM SPACE
        '\u2006': ' ', // SIX-PER-EM SPACE
        '\u2007': '\xa0', // FIGURE SPACE
        '\u2008': ' ', // PUNCTUATION SPACE
        '\u2009': ' ', // THIN SPACE
        '\u200a': ' ', // HAIR SAPCE
        '\u2028': ' ', // LINE SEPARATOR
        '\u2029': ' ', // PARAGRAPH SEPARATOR
        '\u202f': '\xa0', // NARROW NO-BREAK SPACE
        '\u205f': ' ', // MEDIUM MATHEMATICAL SPACE
        '\ufeff': '\u2060', // ZERO WIDTH NON-BREAKING SPACE
    }[char] || char
}

function collapseWSSequence(seq) {
    let start = 0
    let out = ''

    for (let i=1 ; i<seq.length ; ++i) {
        if (seq[i] !== seq[start]) {
            out += seq[start]
            start = i
        }
    }

    if (seq[start] === seq[seq.length - 1]) {
        out += seq[start]
    }

    return out
}
