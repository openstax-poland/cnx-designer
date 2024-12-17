// Copyright 2024 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Operation } from 'slate'

import { Table } from './interfaces'
import { CnxEditor } from './plugin'
import { enumerate } from './util'

export default function apply(
    apply: (op: Operation) => void,
    editor: CnxEditor,
    op: Operation,
): void {
    switch (op.type) {
    case 'merge_node':
    case 'move_node':
    case 'split_node':
    // case 'remove_node':
        // Ignore operations on tables
        if (Table.isGroup(op.node) || Table.isHeaderOrFooter(op.node) || Table.isRow(op.node)
        || Table.isCell(op.node)) {
            break
        }

        apply(op)
        break

    case 'remove_node': {
        const { node, path } = op

        // Ignore operations on tables
        if (Table.isGroup(node) || Table.isHeaderOrFooter(node) || Table.isRow(node)) {
            break
        }

        // Remove contents of a table cell instead of the cell
        if (Table.isCell(node)) {
            Editor.withoutNormalizing(editor, () => {
                for (const [inx, child] of enumerate(node.children, true)) {
                    apply({
                        type: 'remove_node',
                        path: [...path, inx],
                        node: child,
                    })
                }
            })
            break
        }

        apply(op)
        break
    }

    default:
        apply(op)
        break
    }
}
