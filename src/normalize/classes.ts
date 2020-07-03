// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, NodeEntry, Transforms } from 'slate'

import { WithClasses } from '../interfaces'
import { dedup } from '../util'

/**
 * Normalize classes of an element
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeClasses(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (WithClasses.hasClasses(node)) {
        // List of classes must not be empty.
        if (node.classes.length === 0) {
            Transforms.unsetNodes(editor, 'classes', { at: path })
            return true
        }

        // Each class must be valid.
        if (!node.classes.every(WithClasses.isValidClass)) {
            Transforms.setNodes(editor, {
                classes: WithClasses.normalizeClasses(node.classes),
            }, { at: path })
            return true
        }

        // Classes must be sorted and contain no duplicates.
        if (!isSortedUnique(node.classes)) {
            Transforms.setNodes(editor, {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
                classes: dedup(node.classes.sort()),
            }, { at: path })
            return false
        }
    }

    return false
}

/** Check whether an array is sorted and contains no duplicates */
function isSortedUnique(classes: string[]): boolean {
    for (let i = 1 ; i < classes.length ; ++i) {
        if (classes[i - 1] >= classes[i]) {
            return false
        }
    }

    return true
}
