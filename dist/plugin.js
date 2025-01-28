// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import normalizeNode from './normalize';
import { isInline, isVoid } from './interfaces';
/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
export function withCnx(editor) {
    const ed = editor;
    const { normalizeNode: oldNormalizeNode, isInline: oldIsInline, isVoid: oldIsVoid, } = ed;
    ed.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, ed);
    ed.isEquationContent = () => false;
    ed.isInline = (element) => isInline(element) || oldIsInline(element);
    ed.isVoid = (element) => isVoid(element) || oldIsVoid(element);
    return ed;
}
