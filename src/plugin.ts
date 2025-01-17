// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Element } from 'slate'

import apply from './apply'
import normalizeNode from './normalize'
import { isInline, isVoid } from './interfaces'

/** A Slate editor augmented with support for editing CNX documents. */
export interface CnxEditor extends Editor {
    /** Can {@code element} be used as content of an {@link Equation}? */
    isEquationContent(element: Element): boolean
}

/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
export function withCnx<T extends Editor>(editor: T): T & CnxEditor {
    const ed = editor as T & CnxEditor
    const {
        apply: oldApply,
        normalizeNode: oldNormalizeNode,
        isInline: oldIsInline,
        isVoid: oldIsVoid,
    } = ed

    ed.apply = apply.bind(null, oldApply, ed)
    ed.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, ed)

    ed.isEquationContent = (): boolean => false

    ed.isInline = (element: Element): boolean => isInline(element) || oldIsInline(element)

    ed.isVoid = (element: Element): boolean => isVoid(element) || oldIsVoid(element)

    return ed
}
