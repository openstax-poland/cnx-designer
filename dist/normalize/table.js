// Copyright 2024 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Transforms } from 'slate';
import { Caption, Table, Title } from '../interfaces';
import { normalizeOrderedChildren } from './util';
/**
 * Normalize tables
 *
 * Return true if entry was normalized.
 */
export default function normalizeTable(editor, entry) {
    const [node, path] = entry;
    if (Table.isTable(node)) {
        // Tables must not be empty
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        // Table can only contain elements from a predefined set in a strict
        // order
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, Table.isGroup, Caption.isCaption], normalizeInvalidTableChild)) {
            return true;
        }
    }
    else if (Table.isGroup(node)) {
        // Table group can only contain elements from a predefined set in
        // a strict order
        if (normalizeOrderedChildren(editor, [node, path], [Table.isHeader, Table.isRow, Table.isFooter], normalizeInvalidGroupChild)) {
            return true;
        }
    }
    else if (Table.isCell(node)) {
        // Ensure attribute values are correct
        if (!Table.isColumnPosition(node.column)) {
            Transforms.setNodes(editor, { column: null }, { at: path });
            return true;
        }
    }
    return false;
}
/** Normalize an invalid table child */
function normalizeInvalidTableChild(editor, entry, parent) {
    const [node, path] = entry;
    throw Error(`invalid table child ${JSON.stringify(node)} at ${JSON.stringify(path)}`);
}
/** Normalize an invalid table group child */
function normalizeInvalidGroupChild(editor, entry, parent) {
    const [node, path] = entry;
    throw Error(`invalid table child ${JSON.stringify(node)} at ${JSON.stringify(path)}`);
}
