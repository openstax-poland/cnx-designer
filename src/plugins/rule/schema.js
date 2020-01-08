// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

const TYPES = ['rule', 'theorem', 'lemma', 'corollary', 'law', 'proposition']

function normalizeRule(editor, error) {
    const { code, child, key, node, index } = error

    switch (code) {
    // A child of different type was expected.
    case 'child_type_invalid': {
        // A text child could only have been added to an exercise by Slate in
        // event that all other children were removed. In such case we just want
        // to drop the exercise.
        if (Text.isText(child)) {
            editor.removeNodeByKey(node.key)
            return
        }
        // A non-empty rule without a statement should get an empty statement.
        if (index === 0) {
            const statement = Block.create({
                type: 'rule_statement',
                nodes: [
                    // An empty leaf will be added by slate in a subsequent
                    // normalization.
                    Block.create({ type: 'paragraph' }),
                ],
            })
            editor.insertNodeByKey(node.key, 0, statement)
            return
        }
        // Otherwise (invalid child after the statement but not at the end of
        // rule) we fold the invalid child into previous node.
        const previous = node.nodes.get(index - 1)
        editor.moveNodeByKey(child.key, previous.key, previous.nodes.size)
        break
    }

    case 'child_min_invalid': {
        // A non-empty rule without a statement should get an empty statement.
        if (index === 0) {
            // Check for an out-of-place statement.
            const statement_inx = node.nodes.findIndex(
                node => node.type === 'rule_statement')

            if (statement_inx !== -1) {
                // Move statement to the correct place.
                editor.moveNodeByKey(
                    node.nodes.get(statement_inx).key, node.key, 0)
                return
            }

            const statement = Block.create({
                type: 'rule_statement',
                nodes: [
                    // An empty leaf will be added by slate in a subsequent
                    // normalization.
                    Block.create({ type: 'paragraph' }),
                ],
            })
            // Index is also reported as 0 when there's a title before the
            // missing statement.
            const inx = node.nodes.first().type === 'title' ? 1 : 0
            editor.insertNodeByKey(node.key, inx, statement)
            return
        }

        console.warn('Unhandled rule violation:', code)
        break
    }

    case 'node_data_invalid':
        // Rule type is either missing or invalid. Replace it with default
        // ('rule').
        if (key === 'type') {
            editor.setNodeByKey(
                node.key, { data: node.data.set('type', 'rule') })
            return
        }

        /* istanbul ignore next */
        console.warn('Unhandled rule violation: node_data_invalid', key)
        break

    // Rule was inserted into an invalid parent.
    case 'parent_object_invalid':
    case 'parent_type_invalid':
        editor.unwrapBlockByKey(node.key)
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled rule violation:', code)
        break
    }
}

function normalizeContent(editor, error) {
    const { code, node } = error

    switch (code) {
    // Statements, proofs, and examples make no sense outside a rule. Should it
    // happen however, just replace it with its contents.
    case 'parent_type_invalid':
        editor.unwrapBlockByKey(node.key)
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled rule content violation:', code)
        break
    }
}

export const RULE_PARENT = ['document', 'section']

export default function schema(options) {
    const content = {
        match: options.content.map(type => ({ type })),
        min: 1,
    }

    return {
        blocks: {
            rule: {
                parent: [{ object: 'document' }, { type: 'section' }],
                nodes: [
                    { match: { type: 'title' }, min: 0, max: 1 },
                    { match: { type: 'rule_statement' }, min: 1 },
                    { match: { type: 'rule_proof' }, min: 0 },
                    { match: { type: 'rule_example' }, min: 0 },
                ],
                data: {
                    type: v => TYPES.includes(v),
                },
                normalize: normalizeRule,
            },
            rule_statement: {
                parent: { type: 'rule' },
                nodes: [content],
                normalize: normalizeContent,
            },
            rule_proof: {
                parent: { type: 'rule' },
                nodes: [content],
                normalize: normalizeContent,
            },
            rule_example: {
                parent: { type: 'rule' },
                nodes: [content],
                normalize: normalizeContent,
            },
        },
    }
}
