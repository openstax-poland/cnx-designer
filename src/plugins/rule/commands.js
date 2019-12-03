// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

import { RULE_PARENT } from './schema'

/**
 * Create a new rule and wrap currently selected block in it.
 *
 * @param {Slate~Editor} editor
 */
export function insertRule(editor) {
    editor.withoutNormalizing(editor => {
        const { value } = editor
        const { document } = value

        let first = value.startBlock
        let last = value.endBlock

        // Find the lowest common ancestor of nodes in selected range.
        let parent = document.getClosest(
            first.key,
            p1 => Boolean(document.getClosest(last.key, p2 => p1 === p2)),
        ) || document

        // Since Slate's wrapBlock* functions don't split blocks when selection
        // is nested within them, we have to do it ourselves.

        // Adjust selection such that it begins on a direct descendant of
        // |parent|.
        for (;;) {
            const pp = editor.value.document.getParent(first.key)
            if (pp.key === parent.key) break

            // If |first| is the first child of its parent (|pp|) then we can
            // just move selection onto |pp|, otherwise we need to split |pp|,
            // as we'll only be moving some of its contents into the new rule.
            const index = pp.nodes.indexOf(first)
            if (index === 0) {
                first = pp
            } else {
                editor.splitNodeByKey(pp.key, index)
                first = editor.value.document.getParent(first.key)
            }
        }

        // Adjust selection such that it ends on a direct descendant of
        // |parent|.
        for (;;) {
            const pp = editor.value.document.getParent(last.key)
            if (pp.key === parent.key) break

            // See rationale in the previous loop.
            const index = pp.nodes.indexOf(last)
            if (index + 1 === pp.nodes.size) {
                last = pp
            } else {
                editor.splitNodeByKey(pp.key, index + 1)
                last = editor.value.document.getParent(last.key)
            }
        }

        // Previous two loops might have changed |parent|.
        parent = parent.object === 'document'
            ? editor.value.document
            : editor.value.document.getDescendant(parent.key)

        // When using `editor.wrapBlock` slate will place blocks according to
        // its own rules, which don't take into account legal parent-child
        // relations, which may cause rule to be created as a child of e.g.
        // a list, and then promptly removed by normalizations. To avoid this we
        // only use `editor.wrapBlock` when we're sure output will be OK.
        if (RULE_PARENT.includes(parent.type || parent.object)) {
            editor.wrapBlock('rule')
            editor.wrapBlock('rule_statement')
            return
        }

        // At this point the selection begins and ends on direct children
        // of |parent|, which means we can start unwrapping nodes out if it.

        while (!RULE_PARENT.includes(parent.type || parent.object)) {
            if (first === last) {
                // Simple case, Slate can handle it on its own.
                editor.unwrapNodeByKey(first.key)
                parent = editor.value.document.getParent(first.key)
            } else {
                const firstInx = parent.nodes.indexOf(first)
                const lastInx = parent.nodes.indexOf(last)

                if (lastInx + 1 < parent.nodes.size) {
                    editor.splitNodeByKey(parent.key, lastInx + 1)
                }
                if (firstInx > 0) {
                    editor.splitNodeByKey(parent.key, firstInx)
                }

                first = last = editor.value.document.getParent(first.key)
                parent = editor.value.document.getParent(first.key)
            }
        }

        // At this point the selected range is directly under a legal parent
        // of rule.

        const start = parent.nodes.indexOf(first)
        const end = parent.nodes.indexOf(last) + 1
        const nodes = parent.nodes.slice(start, end)

        // Note that nodes in |nodes| are still children of |parent|, so we
        // can't pass them as to `Block.create`, we'll have to move them.
        const problem = Block.create({ type: 'rule_statement' })
        const rule = Block.create({ type: 'rule', nodes: [problem] })
        editor.insertNodeByKey(parent.key, start, rule)

        // Now we can move |nodes| into |problem|.
        nodes.forEach((node, inx) => {
            editor.moveNodeByKey(node.key, problem.key, inx)
        })
    })
}

/**
 * Create a new child element, insert it into current rule, and collapse
 * selection into it.
 *
 * Fails if no rule is selected.
 *
 * @param {Slate~Editor} editor
 * @param {string} type         type of element to insert
 * @param {string} ...previous  type of elements before the one to insert
 */
function insertInRule(editor, type, ...previous) {
    const rule = editor.getActiveRule(editor.value)

    if (rule === null) {
        return
    }

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const node = Block.create({
        type,
        nodes: [para],
    })

    let index = rule.nodes.findLastIndex(node => node.type === type)

    for (let i = 0 ; index === -1 && i < previous.length ; ++i) {
        index = rule.nodes.findLastIndex(node => node.type === previous[i])
    }

    editor.insertNodeByKey(rule.key, index + 1, node)
    editor.moveToStartOfNode(node)
}

/**
 * Create a new statement, insert it into current rule, and collapse selection
 * into it.
 *
 * Fails if no rule is selected.
 *
 * @param {Slate~Editor} editor
 */
export function insertStatement(editor) {
    insertInRule(editor, 'rule_statement')
}

/**
 * Create a new proof, insert it into current rule, and collapse selection
 * into it.
 *
 * Fails if no rule is selected.
 *
 * @param {Slate~Editor} editor
 */
export function insertProof(editor) {
    insertInRule(editor, 'rule_proof', 'rule_statement')
}

/**
 * Create a new example, insert it into current rule, and collapse selection
 * into it.
 *
 * Fails if no rule is selected.
 *
 * @param {Slate~Editor} editor
 */
export function insertRuleExample(editor) {
    insertInRule(editor, 'rule_example', 'rule_proof', 'rule_statement')
}
