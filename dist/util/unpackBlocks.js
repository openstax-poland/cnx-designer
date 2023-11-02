// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor } from 'slate';
import { cloneNode } from '.';
export default function unpackBlocks(editor, fragment) {
    function* unpack(nodes) {
        for (const node of nodes) {
            if (Editor.isBlock(editor, node)) {
                yield* unpack(node.children);
            }
            else {
                yield cloneNode(node);
            }
        }
    }
    return Array.from(unpack(fragment));
}
