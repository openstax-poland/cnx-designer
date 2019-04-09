// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * Add term at current selection.
 *
 * @param {Slate~Change} change
 */
export function addTerm(change) {
    change.addMark({
        type: 'term',
        data: {
            reference: change.value.fragment.text,
        }
    })
}

/**
 * Remove term at current selection.
 *
 * @param {Slate~Change} change
 */
export function removeTerm(change) {
    const term = change.getActiveTerm()
    if (!term) return
    
    change.moveAnchorTo(term.focusText.key, term.offsetStart)
    change.moveFocusTo(term.focusText.key, term.offsetEnd)
    change.removeMark({ type: 'term', data: { reference: term.reference } })
}

/**
 * Remove term at current selection.
 *
 * @param {Slate~Change} change
 * @param {string} reference
 */
export function changeTermReference(change, newReference) {
    const term = change.getActiveTerm()
    if (!term) return
    
    change.moveAnchorTo(term.focusText.key, term.offsetStart)
    change.moveFocusTo(term.focusText.key, term.offsetEnd)
    change.replaceMark({
      type: 'term',
      data: { reference: term.reference },
    }, {
      type: 'term',
      data: { reference: newReference },
    })
}
