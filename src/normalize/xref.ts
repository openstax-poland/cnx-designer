// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, NodeEntry, Transforms } from 'slate'

import { CrossReference } from '../interfaces'

/**
 * Normalize links and cross-references
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeXref(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (CrossReference.isCrossReference(node)) {
        if (node.case && !CrossReference.isCase(node.case)) {
            Transforms.unsetNodes(editor, 'case', { at: path })
            return true
        }
    }

    return false
}
