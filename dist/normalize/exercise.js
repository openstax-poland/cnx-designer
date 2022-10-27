// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Transforms } from 'slate';
import { Commentary, Exercise, Problem, Section, Solution } from '../interfaces';
import { normalizeOrderedChildren } from './util';
/**
 * Normalize an exercise or contents of an exercise
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeExercise(editor, entry) {
    const [node, path] = entry;
    // Problems, solutions, and commentaries make no sense outside an exercise.
    // Should it happen however, just replace it with its contents.
    if (Problem.isProblem(node) || Solution.isSolution(node)
        || Commentary.isCommentary(node)) {
        const [parent] = Editor.parent(editor, path);
        if (!Exercise.isExercise(parent)) {
            Transforms.unwrapNodes(editor, { at: path });
            return true;
        }
    }
    if (Exercise.isExercise(node)) {
        // An exercise must not be empty.
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        // Exercise can only be a child of sections and the document.
        const [parent, parentPath] = Editor.parent(editor, path);
        if (!Section.isSection(parent) && parentPath.length > 0) {
            Transforms.unwrapNodes(editor, { at: path });
            return true;
        }
        // Exercise can only contain elements from a predefined set and in
        // a strict order.
        if (normalizeOrderedChildren(editor, [node, path], [Problem.isProblem, Solution.isSolution, Commentary.isCommentary], normalizeInvalidChild)) {
            return true;
        }
        // Exercise must have a problem.
        if (!Problem.isProblem(node.children[0])) {
            Transforms.insertNodes(editor, {
                type: 'exercise_problem',
                children: [
                    { type: 'paragraph', children: [] },
                ],
            }, { at: [...path, 0] });
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
    if (index > 0) {
        const previous = parent.children[index - 1];
        Transforms.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index - 1, previous.children.length],
        });
        return;
    }
    // Note that at this point index is guaranteed to be zero.
    // Otherwise if the next child is a problem then fold this child into
    // the problem.
    if (parent.children.length > 1
        && Problem.isProblem(parent.children[1])) {
        Transforms.moveNodes(editor, {
            at: [...path, index],
            to: [...path, 1, 0],
        });
        return;
    }
    // Otherwise we wrap the first child in a problem.
    Transforms.wrapNodes(editor, {
        type: 'exercise_problem',
        children: [],
    }, { at: [...path, 0] });
}
