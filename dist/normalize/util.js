// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Transforms } from 'slate';
import { enumerate } from '../util';
/**
 * Find children which are out of order and move them to correct places
 *
 * Return true if entry was normalized and false otherwise.
 */
export function normalizeOrderedChildren(editor, entry, groups, normalize) {
    var _a;
    const [node, path] = entry;
    // Iterator over groups.
    let inx = 0;
    // Current group (groups[inx]).
    let match = groups[0];
    // For each group, the last group successfully matched at that point.
    const lastMatch = [];
    for (const [index, child] of enumerate(node.children)) {
        // Skip all groups which don't match child.
        while (match != null && !match(child)) {
            match = groups[++inx];
        }
        if (match != null) {
            lastMatch[inx] = match;
            continue;
        }
        // Find the group matching this child.
        for (inx = 0; inx < groups.length; ++inx) {
            if (groups[inx](child)) {
                break;
            }
        }
        const childPath = [...path, index];
        // Child is not matched by any group.
        if (inx === groups.length) {
            normalize(editor, [child, childPath], node);
            return true;
        }
        const targetMatch = lastMatch[inx] || lastMatch[inx - 1] || (() => false);
        // Find child which should be directly before this one.
        const [, prevPath] = (_a = Editor.previous(editor, {
            at: childPath,
            match: n => node.children.includes(n) && targetMatch(n),
        })) !== null && _a !== void 0 ? _a : [];
        // Move the child to where it should be.
        if (prevPath == null) {
            Transforms.moveNodes(editor, {
                at: childPath,
                to: [...path, 0],
            });
        }
        else {
            prevPath[prevPath.length - 1] += 1;
            Transforms.moveNodes(editor, {
                at: childPath,
                to: prevPath,
            });
        }
        return true;
    }
    // All children are correctly ordered.
    return false;
}
/**
 * Find a previous sibling of node matching specified criteria, and stepping
 * only over siblings matching other criteria.
 */
export function previousOverOnly(editor, options) {
    const { at, match, over } = options;
    const [parent, parentPath] = Editor.parent(editor, at);
    for (let index = at[at.length - 1] - 1; index >= 0; --index) {
        const child = parent.children[index];
        if (match(child)) {
            return [child, [...parentPath, index]];
        }
        if (!over(child)) {
            return;
        }
    }
}
