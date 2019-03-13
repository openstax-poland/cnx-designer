// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Point, Range } from 'slate'

// type SuggestionType = 'remove' | 'add' | 'strong' | 'underline' | 'italic'

// type Suggestion = {
//   type: SuggestionType,
//   text: string,
//   block: Block,
//   offsetStart: number,
//   offsetEnd: number,
// }

export function getActiveSuggestion(editor, value) {
    const node = value.startBlock
    if (!node) return null

    const focusLeaf = value.focusText.searchLeafAtOffset(value.selection.focus.offset)

    let suggestionType = null
    
    if (!focusLeaf.leaf.marks) return null
    focusLeaf.leaf.marks.some(m => {
        if (m && m.type === 'suggestion') {
            Object.keys(JSON.parse(JSON.stringify(m.data))).forEach(key => {
                suggestionType = key
            })
            return true
        }
        return false
    })

    if (!suggestionType) return null

    return {
        type: suggestionType,
        leaf: focusLeaf.leaf,
        block: node,
        offsetStart: focusLeaf.startOffset,
        offsetEnd: focusLeaf.endOffset,
    }
}

/**
 * Get all suggestions from document.
 * 
 * @returns {Suggestion[]} 
 */
export function getSuggestions(editor, value) {
    const { document: { nodes } } = value

    let suggestions = []

    nodes.forEach(block => {
        if (block && block.getMarksByType('suggestion')) {
            let suggs = getSuggestionsFromNode(block)
            suggestions = suggestions.concat(suggs)
        }
    })

    return suggestions
}

/**
 * Return array of suggestions for given Text.
 * This is helper function for getSuggestions().
 * 
 * @param {Slate~Text} text 
 * @param {Slate~Block} block
 * @returns {Suggestion[]}
 */
function getSuggestionsFromText(text, block) {
    let suggestions = []
    let currentOffset = 0

    text.getLeaves().forEach(l => {
        if (!l) return
        
        const marks = l.marks ? l.marks : null
        if (!marks) return

        marks.some(m => {
            if (!m) return false
            if (m.type === 'suggestion') {
                let suggestionType = null
                Object.keys(JSON.parse(JSON.stringify(m.data))).forEach(key => {
                    suggestionType = key
                })
                if (!suggestionType) return false
                suggestions.push({
                    type: suggestionType,
                    leaf: l,
                    block: block,
                    offsetStart: currentOffset,
                    offsetEnd: currentOffset + l.text.length,
                })
                return true
            }
            return false
        })

        currentOffset += l.text.length
    })

    return suggestions
}

/**
 * Return array of suggestions for given Node.
 * This is helper function for getSuggestions().
 * 
 * @param {Slate~Node} node
 * @returns {Suggestion[]}
 */
function getSuggestionsFromNode(node) {
    let suggestions = []

    if (!node) return suggestions
    
    node.nodes.forEach(n => {
        if (n) {
            let suggs
            switch (n.object) {
                case 'text':
                    suggs = getSuggestionsFromText(n, node)
                    break

                case 'inline':
                    suggs = getSuggestionsFromNode(n)
                    break

                case 'block':
                    suggs = getSuggestionsFromNode(n)
                    break
                
                default:
                    console.warn('Unhandled node.object type:', n.object)
                    break
            }
            if (suggs) {
                suggestions = suggestions.concat(suggs)
            }
        }
    })

    return suggestions
}

/**
 * Return true if anchor offset or key is different than focus offset or key
 * 
 * @param {Slate~Editor} editor
 */
export function isFragmentSelected(editor) {
    const { anchor, focus } = editor.value.selection
    if ((anchor.offset !== focus.offset) || (anchor.key !== focus.key)) {
        return true
    }
    return false
}

/**
 * Return all text leaves at selected fragment
 * 
 * @param {Slate~Change} change
 * @returns {Leaf[]}
 */
export function getLeavesAtSelection(editor) {
    const node = editor.value.startBlock
    if (!node) return []
  
    const { anchor, focus } = editor.value.selection
    const fragment = node.getFragmentAtRange(Range.create({
        anchor: Point.create({ key: node.key, offset: anchor.offset}),
        focus: Point.create({ key: node.key, offset: focus.offset}),
    }))
    let leaves = []
    fragment.nodes.forEach(n => {
        if (n && n.object === 'text') {
            n.getLeaves().toArray().forEach(l => {
                leaves.push(l)
            })
        }
    })
    return leaves
}

/**
 * Return true if there is suggestion mark with given type.
 * 
 * @param {Slate~Editor} editor
 * @param {Slate~Leaf} leaf
 * @param {SuggestionType} type
 * @returns {boolean}
 */
export function hasSuggestionType(_, leaf, type) {
    const marks = leaf.marks
    if (!marks) return false
    return marks.some(m => {
        if (!m) return false
        return m.data.has(type)
    })
}
