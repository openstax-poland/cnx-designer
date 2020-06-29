// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Element } from 'slate'

import normalizeNode from './normalize'
import { isInline, isVoid } from './interfaces'

/** A Slate editor augmented with support for editing CNX documents. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CnxEditor extends Editor {
}

/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
export function withCnx<T extends Editor>(editor: T): T & CnxEditor {
    const ed = editor as T & CnxEditor
    const {
        normalizeNode: oldNormalizeNode,
        isInline: oldIsInline,
        isVoid: oldIsVoid,
    } = ed

    ed.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, ed)

    ed.isInline = (element: Element): boolean =>
        isInline(element) || oldIsInline(element)

    ed.isVoid = (element: Element): boolean =>
        isVoid(element) || oldIsVoid(element)

    return ed
}
