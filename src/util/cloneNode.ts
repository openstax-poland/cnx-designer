// Copyright 2023 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Node, Text } from 'slate'

/** Deep clone a node */
export default function cloneNode<T extends Node>(node: T): T {
    return Text.isText(node)
        ? { ...node }
        : {
            ...node,
            children: node.children.map(cloneNode),
        }
}
