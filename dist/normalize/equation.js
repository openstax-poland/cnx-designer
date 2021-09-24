// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element, Transforms } from 'slate';
import { Equation } from '../interfaces';
export default function normalizeEquation(editor, entry) {
    const [node, path] = entry;
    if (Equation.isEquation(node)) {
        // Equations must not be empty
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        // Rules must only have a single child
        if (node.children.length > 1) {
            Transforms.splitNodes(editor, { at: [...path, node.children.length - 1] });
            return true;
        }
        // Equation can only contain elements from a predefined set and in
        // a strict order.
        if (!Element.isElement(node.children[0]) || !editor.isEquationContent(node.children[0])) {
            Transforms.unwrapNodes(editor, {
                at: [...path, 0],
                match: n => n === node,
            });
            return true;
        }
    }
    return false;
}
