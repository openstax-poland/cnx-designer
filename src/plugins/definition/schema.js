// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Text, Block } from 'slate'

function normalizeDefinition(change, error) {
    const { code, key, index, node, child } = error

    switch (code) {
    case 'first_child_type_invalid':
        // Insert missing definition_term
        const term = Block.create({
            type: 'definition_term',
            nodes: [Text.create()],
        })
        change.insertNodeByKey(node.key, 0, term)
        break

    case 'child_type_invalid':
        if (Text.isText(child)) {
            change.setNodeByKey(child.key, 'paragraph')
            break
        }
        if (child.type === 'paragraph') {
            change.wrapNodeByKey(child.key, Block.create('definition_meaning'))
            break
        }

        console.warn('Unhandled definition child_type_invalid:', child)
        break

    case 'child_min_invalid':
        if (!node.nodes.some(n => n.type && n.type === 'definition_meaning')) {
            // Insert missing meaning.
            change.insertMeaning()
            break
        }

        console.log('Unhandled definition child_min_invalid:', child)
        break

    case 'child_unknown':
        // An invalid node following the See Also should be folded into the
        // See Also.
        if (index > 0) {
            const nodeBefore = node.nodes.get(index - 1)
            if (nodeBefore && nodeBefore.type === 'definition_seealso') {
                change.moveNodeByKey(child.key, nodeBefore.key, nodeBefore.nodes.size)
                break
            }
        }

        // Unwrap any other nodes
        change.unwrapBlockByKey(child.key)
        break

    default:
        console.warn('Unhandled definition violation:', code)
        break
    }
}

function normalizeTerm(change, error) {
    const { code, key, node, child } = error

    switch (code) {
    case 'parent_type_invalid':
        change.unwrapBlockByKey(node.key)
        break

    default:
        console.warn('Unhandled definition_term violation:', code)
        break
    }
}

function normalizeMeaning(change, error) {
    const { code, key, node, child } = error

    switch (code) {
    case 'child_type_invalid':
        if (Text.isText(child)) {
            change.wrapNodeByKey(child.key, Block.create('paragraph'))
            break
        }

        console.warn('Unhandled definition_meaning child_type_invalid:', child)
        break

    case 'child_unknown':
        change.unwrapBlockByKey(child.key)
        break

    case 'child_max_invalid':
        change.unwrapNodeByKey(child.key)
        break

    case 'parent_type_invalid':
        change.unwrapBlockByKey(node.key)
        break

    default:
        console.warn('Unhandled definition_meaning violation:', code)
        break
    }
}

function normalizeExample(change, error) {
    const { code, key, node, child } = error

    switch (code) {
    case 'child_type_invalid':
        if (Text.isText(child)) {
            change.removeNodeByKey(child.key)
            break
        }

        console.warn('Unhandled definition_example child_type_invalid:', child)
        break

    case 'parent_type_invalid':
        change.unwrapBlockByKey(node.key)
        break

    default:
        console.warn('Unhandled definition_example violation:', code)
        break
    }
}

function normalizeSeeAlso(change, error) {
    const { code, key, node, child } = error

    switch (code) {
    case 'child_min_invalid':
        change.removeNodeByKey(node.key)
        break
    
    case 'child_type_invalid':
        if (child.type === 'paragraph') {
            change.setNodeByKey(child.key, { type: 'definition_term' })
            break
        }

        console.warn('Unhandled definition_seealso child_type_invalid:', child)
        break

    case 'parent_type_invalid':
        change.unwrapBlockByKey(node.key)
        break

    default:
        console.warn('Unhandled definition_seealso violation:', code, JSON.stringify(child))
        break
    }
}

const CONTENT = [
    { type: 'definition_meaning' },
    { type: 'definition_example' },
]

export default {
    blocks: {
        definition: {
            nodes: [
                { match: { type: 'definition_term' }, min: 1, max: 1 },
                { match: { type: 'definition_meaning' }, min: 1 },
                { match: CONTENT },
                { match: { type: 'definition_seealso' }, min: 0, max: 1 },
            ],
            first: { type: 'definition_term' },
            normalize: normalizeDefinition,
        },
        definition_term: {
            parent: [ 
                { match: { type: 'definition' } },
                { match: { type: 'definition_seealso' } },
            ],
            normalize: normalizeTerm,
        },
        definition_meaning: {
            nodes: [ { match: { type: 'paragraph' }, min: 1, max: 1 } ],
            parent: { type: 'definition' },
            normalize: normalizeMeaning,
        },
        definition_example: {
            nodes: [ { match: { type: 'paragraph' }, min: 1 } ],
            parent: { type: 'definition' },
            normalize: normalizeExample,
        },
        definition_seealso: {
            nodes: [ { match: { type: 'definition_term' }, min: 1 } ],
            parent: { type: 'definition' },
            normalize: normalizeSeeAlso,
        }
    },
}
