// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Transforms } from 'slate';
import { Admonition } from '../interfaces';
/**
 * Normalize an admonition
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeAdmonition(editor, entry) {
    const [node, path] = entry;
    if (Admonition.isAdmonition(node)) {
        // Admonition's kind must be valid.
        if (!Admonition.isAdmonitionKind(node.kind)) {
            Transforms.setNodes(editor, { kind: 'note' }, { at: path });
            return true;
        }
    }
    return false;
}
