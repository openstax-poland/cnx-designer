import { Inline } from 'slate'

/**
 * Crate and insert a cross-reference.
 *
 * @param {Slate~Change} change
 * @param {string}       target ID of the target node
 */
export function insertXref(change, target) {
    const ref = Inline.create({
        type: 'xref',
        data: { target },
    })

    change.insertInline(ref)
}
