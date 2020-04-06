// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element, Node } from 'slate'

import { StyledText } from '../interfaces'

const KNOWN_TEXT_PROPS = ['text', 'emphasis', 'strong', 'position']

/** Check if a node contains only plain, unmarked text */
export function isPlainText(node: Node): boolean {
    if (Element.isElement(node)) {
        return node.children.every(isPlainText)
    }

    if (!Object.keys(node).every(key => KNOWN_TEXT_PROPS.includes(key))) {
        return false
    }

    const text = node as StyledText

    return !text.emphasis
        && !text.strong
        && (text.position == null || text.position === 'normal')
}
