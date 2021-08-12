// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element, NodeEntry, Transforms } from 'slate'

import { Equation } from '../interfaces'
import { CnxEditor } from '../plugin'

export default function normalizeEquation(editor: CnxEditor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (Equation.isEquation(node)) {
        // Equations must not be empty
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // Equations must only have a single child
        if (node.children.length > 1) {
            Transforms.splitNodes(editor, { at: [...path, node.children.length - 1] })
            return true
        }

        // Equation can only contain elements from a predefined set and in
        // a strict order.
        if (!Element.isElement(node.children[0]) || !editor.isEquationContent(node.children[0])) {
            Transforms.unwrapNodes(editor, {
                at: [...path, 0],
                match: n => n === node,
            })
            return true
        }
    }

    return false
}
