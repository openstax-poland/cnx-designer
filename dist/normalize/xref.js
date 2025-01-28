// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Transforms } from 'slate';
import { CrossReference, DocumentReference } from '../interfaces';
/**
 * Normalize links and cross-references
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeXref(editor, entry) {
    const [node, path] = entry;
    if (CrossReference.isCrossReference(node)
        || DocumentReference.isDocumentReference(node)) {
        if (node.case && !CrossReference.isCase(node.case)) {
            Transforms.unsetNodes(editor, 'case', { at: path });
            return true;
        }
    }
    return false;
}
