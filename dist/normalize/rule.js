// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Transforms } from 'slate';
import { Proof, Rule, RuleExample, Section, Statement, Title } from '../interfaces';
import { normalizeOrderedChildren } from './util';
/**
 * Normalize an rule or contents of an rule
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeRule(editor, entry) {
    const [node, path] = entry;
    // A rule's content.
    if (Statement.isStatement(node) || Proof.isProof(node)
        || RuleExample.isRuleExample(node)) {
        // Statements, proofs, and examples make no sense outside a rule. Should
        // it happen however, just replace it with its contents.
        const [parent] = Editor.parent(editor, path);
        if (!Rule.isRule(parent)) {
            Transforms.unwrapNodes(editor, { at: path });
            return true;
        }
    }
    if (Rule.isRule(node)) {
        // Rule's kind must be valid.
        if (!Rule.isRuleKind(node.kind)) {
            Transforms.setNodes(editor, { kind: 'rule' }, { at: path });
            return true;
        }
        // Rules must not be empty.
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        // Rule can only be a child of sections and the document.
        const [parent, parentPath] = Editor.parent(editor, path);
        if (!Section.isSection(parent) && parentPath.length > 0) {
            Transforms.unwrapNodes(editor, { at: path });
            return true;
        }
        // Exercise can only contain elements from a predefined set and in
        // a strict order.
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, Statement.isStatement, Proof.isProof, RuleExample.isRuleExample], normalizeInvalidChild)) {
            return true;
        }
        // Rules must have a statement.
        const firstIndex = Title.isTitle(node.children[0]) ? 1 : 0;
        if (!Statement.isStatement(node.children[firstIndex])) {
            Transforms.insertNodes(editor, {
                type: 'rule_statement',
                children: [
                    { type: 'paragraph', children: [] },
                ],
            }, { at: [...path, firstIndex] });
            return true;
        }
    }
    return false;
}
/** Normalize an invalid child */
function normalizeInvalidChild(editor, entry, parent) {
    const [, path] = entry;
    const index = path.pop();
    // If there are valid children before this one, fold it into the previous
    // child.
    if (index > 0 && !Title.isTitle(parent.children[index - 1])) {
        const previous = parent.children[index - 1];
        Transforms.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index - 1, previous.children.length],
        });
        return;
    }
    // Note that at this point index is guaranteed to be either zero or one.
    // Otherwise if the next child is a statement then fold this child into
    // that statement.
    if (index + 1 < parent.children.length
        && Statement.isStatement(parent.children[index + 1])) {
        Transforms.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index + 1, 0],
        });
        return;
    }
    // Otherwise we wrap the first child in a problem.
    Transforms.wrapNodes(editor, {
        type: 'rule_statement',
        children: [],
    }, { at: [...path, index] });
}
