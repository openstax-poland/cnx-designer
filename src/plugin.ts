// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'
import { ListEditor, withLists } from 'slate-lists'

import normalizeNode from './normalize'
import { isInline, isVoid } from './interfaces'

/** A Slate editor augmented with support for editing CNX documents. */
export interface CnxEditor extends ListEditor {
    /** Can {@code element} be used as content of an {@link Equation}? */
    isEquationContent(element: Element): boolean
}

/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
export function withCnx<T extends ListEditor>(editor: T): T & CnxEditor {
    const ed = withLists(editor) as T & CnxEditor
    const {
        normalizeNode: oldNormalizeNode,
        isInline: oldIsInline,
        isVoid: oldIsVoid,
    } = ed

    ed.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, ed)

    ed.isEquationContent = (): boolean => false

    ed.isInline = (element: Element): boolean => isInline(element) || oldIsInline(element)

    ed.isVoid = (element: Element): boolean => isVoid(element) || oldIsVoid(element)

    return ed
}
