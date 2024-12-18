// Copyright 2023 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Text } from 'slate';
/** Deep clone a node */
export default function cloneNode(node) {
    return Text.isText(node)
        ? { ...node }
        : {
            ...node,
            children: node.children.map(cloneNode),
        };
}
