// Copyright 2024 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Transforms } from 'slate';
import { Caption, Table, Title } from '../interfaces';
import { enumerate } from '../util';
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
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, Table.isGroup, Table.isSummary, Caption.isCaption], normalizeInvalidTableChild)) {
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
    else if (Table.isRow(node)) {
        // Table rows can only contain cells
        for (const [inx, child] of enumerate(node.children)) {
            if (!Table.isCell(child)) {
                const prev = node.children[inx - 1];
                const next = node.children[inx + 1];
                if (Table.isCell(prev)) {
                    Transforms.moveNodes(editor, {
                        at: [...path, inx],
                        to: [...path, inx - 1, prev.children.length],
                    });
                    return true;
                }
                else if (Table.isCell(next)) {
                    Transforms.moveNodes(editor, {
                        at: [...path, inx],
                        to: [...path, inx + 1, 0],
                    });
                    return true;
                }
            }
        }
    }
    else if (Table.isCell(node)) {
        // A table cell must not be empty
        if (node.children.length === 0) {
            Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [{ text: '' }],
            }, { at: [...path, 0] });
            return true;
        }
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
