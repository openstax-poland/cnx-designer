// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/* type Term = {
  reference: string,
  leaf: Slate~Leaf,
  focusText: Slate~Text,
  offsetStart: number,
  offsetEnd: number,
} */

/**
 * Find Term in selection
 *
 * @param {Slate~Change} change
 * 
 * @return {Term|null}
 */
export function getActiveTerm(change) {
  const value = change.value

  const focusLeaf = value.focusText.searchLeafAtOffset(value.selection.focus.offset)

  let reference = ''

  if (!focusLeaf.leaf.marks) return null
  focusLeaf.leaf.marks.some(m => {
    if (m && m.type === 'term') {
      reference = m.data.get('reference')
      return true
    }
    return false
  })

  if (!reference) return null

  return {
    reference,
    leaf: focusLeaf.leaf,
    focusText: value.focusText,
    offsetStart: focusLeaf.startOffset,
    offsetEnd: focusLeaf.endOffset,
  }
}
