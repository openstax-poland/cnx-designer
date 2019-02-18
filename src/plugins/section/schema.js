// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { List } from 'immutable'

function normalizeSection(change, error) {
    const { node, code, key } = error

    // TODO: insert default title when missing
    switch (code) {
    case 'node_data_invalid':
        if (key === 'class') {
            const newClasses = List(node.data.get('class').join(' ').trim().split(/\s+/))
            const newData = node.data.set('class', newClasses)
            change.setNodeByKey(node.key, { data: newData })
            break
        }

        console.warn('Unhandled section violation:', code)
        break

    default:
        console.warn('Unhandled section violation:', code)
        break
    }
}

export default {
    blocks: {
        section: {
            // TODO:
            // nodes: [
            //     { type: 'title', min: 1, max: 1 },
            // ]
            data: {
                class: c => c == null || (List.isList(c) && c.every(x => x.match(/\s/) == null)),
            },
            normalize: normalizeSection,
        }
    }
}
