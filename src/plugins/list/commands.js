// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { cleanAttrs } from '../../cnxml/util'

/**
 * Change type of the selected list.
 *
 * @param {Slate~Change} change
 * @param {string} type
 */
export function changeListType(change, type) {
    const node = change.getCurrentList(change.value)

    if (node === null) {
        change.wrapInList(type)
    } else {
        change.setNodeByKey(
            node.key,
            {
                type,
                data: cleanAttrs({
                    class: node.data.get('class'),
                    type: node.data.get('type'),
                    markPrefix: node.data.get('markPrefix'),
                    markSuffix: node.data.get('markSuffix'),
                    itemSep: node.data.get('itemSep'),
                }),
            })
    }
}
