// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Editor } from 'slate'

import cloneNode from './cloneNode'

export default function unpackBlocks(editor: Editor, fragment: Descendant[]): Descendant[] {
    function *unpack(nodes: Descendant[]): Iterable<Descendant> | ArrayLike<Descendant> {
        for (const node of nodes) {
            if (Editor.isBlock(editor, node)) {
                yield* unpack(node.children)
            } else {
                yield cloneNode(node)
            }
        }
    }
    return Array.from(unpack(fragment))
}
