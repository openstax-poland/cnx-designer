// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Point, Range } from 'slate'

/**
 * Remove all marks from current selection.
 *
 * @param {Slate~Change} change
 */
export function removeMarks(change) {
    for (const mark of change.value.marks) {
        if (mark.type !== 'suggestion') {
            change.removeMark(mark)
        }
    }
}

/**
 * Add suggestion mark so next inserted text will be wrapped within.
 * 
 * @param {Slate~Change} change
 * @param {SuggestionType} type
 */
export function addSuggestion(change, type) {
    change.clearSuggestions()
    change.addMark({ type: 'suggestion', data: { [type]: true } })
}

/**
 * Remove suggestion mark and all of it's types.
 * 
 * @param {Slate~Change} change
 */
export function clearSuggestions(change) {
    change.removeMark({ type: 'suggestion', data: { add: true } })
    change.removeMark({ type: 'suggestion', data: { remove: true } })
}

/**
 * Process selected leaves to suggest deleting them.
 * Delete text added as suggestion[data-add].
 * Mark normal text as suggestion[data-remove].
 * Do nothing if text was already marked as suggestion[data-remove].
 * 
 * @param {Slate~Change} change
 */
export function suggestDeleteSelection(change) {
    const { anchor, focus } = change.value.selection 
    if (anchor.offset === focus.offset) {
        console.warn('suggestDeleteSelection() need a selection.')
        return
    }
  
    change.normalizeAnchorFocus()
    
    const leaves = change.getLeavesAtSelection()
    leaves.forEach(l => {
        const { anchor, focus } = change.value.selection
        // Select only current leaf
        const endOfLeafOffset = anchor.offset + l.text.length
        change.moveFocusTo(endOfLeafOffset)
    
        const marks = l.marks
        if (!marks) {
            // Apply remove suggestion
            change.addSuggestion('remove')
            change.moveTo(endOfLeafOffset)
        }
  
        if (change.hasSuggestionType(l, 'add')) {
            change.deleteAtRange(Range.create({
                anchor: Point.create({ key: anchor.key, offset: anchor.offset }),
                focus: Point.create({ key: focus.key, offset: endOfLeafOffset })
            }))
            change.moveTo(anchor.offset)
            return
        } else if (change.hasSuggestionType(l, 'remove')) {
            // This is already suggested to remove so leave this as it is.
            change.moveTo(endOfLeafOffset)
        } else {
            // Apply remove suggestion
            change.addSuggestion('remove')
            change.moveTo(endOfLeafOffset)
        }
    })
}

/**
 * Replace selected fragment with given text.
 * 
 * @param {Slate~Change} change
 * @param {string} text
 */
export function suggestReplaceSelection(change, text) {
    change.suggestDeleteSelection()
    change.addSuggestion('add')
    change.insertText(text)
}

/**
 * User is able to select text from left to right and from right to left
 * which causes different posion for anchor and focus points.
 * We are standarizing this so anchor is always before focus.
 * 
 * @param {Slate~Change} change
 */
export function normalizeAnchorFocus(change) {
    const { anchor, focus } = change.value.selection
  
    if (anchor.offset > focus.offset) {
        const newAnchorOffset = focus.offset
        const newFocusOffset = anchor.offset
        change.moveAnchorTo(newAnchorOffset)
        change.moveFocusTo(newFocusOffset)
    }
}

/**
 * Remove if suggestion[data-remove].
 * Remove suggestion mark if suggestion[data-add].
 * 
 * @param {Slate~Change} change 
 * @param {Suggestion} suggestion 
 */
export function acceptSuggestion(change, suggestion) {
    switch (suggestion.type) {
        case 'add':
            change.moveAnchorTo(suggestion.block.key, suggestion.offsetStart)
            change.moveFocusTo(suggestion.block.key, suggestion.offsetEnd)
            change.removeMark({ type: 'suggestion', data: { add: true } })
            change.moveTo(suggestion.offsetStart)
            break

        case 'remove':
            change.moveAnchorTo(suggestion.block.key, suggestion.offsetStart)
            change.moveFocusTo(suggestion.block.key, suggestion.offsetEnd)
            change.delete()
            break
        
        default:
            console.warn('Unhandled suggestion type:', suggestion.type)
            break
    }
}

/**
 * Remove suggestion mark if suggestion[data-remove].
 * Remove if suggestion[data-add].
 * 
 * @param {Slate~Change} change 
 * @param {Suggestion} suggestion 
 */
export function declineSuggestion(change, suggestion) {
    switch (suggestion.type) {
        case 'add':
            change.moveAnchorTo(suggestion.block.key, suggestion.offsetStart)
            change.moveFocusTo(suggestion.block.key, suggestion.offsetEnd)
            change.delete()
            break

        case 'remove':
            change.moveAnchorTo(suggestion.block.key, suggestion.offsetStart)
            change.moveFocusTo(suggestion.block.key, suggestion.offsetEnd)
            change.removeMark({ type: 'suggestion', data: { remove: true } })
            change.moveTo(suggestion.offsetStart)
            break
        
        default:
            console.warn('Unhandled suggestion type:', suggestion.type)
            break
    }
}
