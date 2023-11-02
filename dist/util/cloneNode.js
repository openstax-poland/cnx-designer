// Copyright 2023 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Text } from 'slate';
/** Deep clone a node */
export default function cloneNode(node) {
    if (Text.isText(node)) {
        return { ...node };
    }
    else {
        return {
            ...node,
            children: node.children.map(cloneNode),
        };
    }
}
