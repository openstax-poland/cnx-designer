// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeList(change, error) {
    const { child, code } = error

    switch (code) {
    case 'child_type_invalid': {
        change.unwrapNodeByKey(child.key)
        break
    }

    /* istanbul ignore next */
    default:
        console.warn('Unhandled list violation:', code)
        break
    }
}

function normalizeListItem(change, error) {
    const { child, code } = error

    switch (code) {
    case 'child_type_invalid': {
        if (child.object === 'text') {
            change.wrapBlockByKey(child.key, 'paragraph')
            break
        }
        change.unwrapNodeByKey(child.key)
        break
    }

    /* istanbul ignore next */
    default:
        console.warn('Unhandled list_item violation:', code)
        break
    }
}

export default function make_schema({ content = [] }) {
    return {
        rules: [
            {
                match: [{ type: 'ul_list' }, { type: 'ol_list' }],
                nodes: [{ match: [{ type: 'list_item' }] }],
                normalize: normalizeList,
            },
            {
                match: {
                    object: 'block',
                    type: 'list_item',
                },
                nodes: [{ match: content.map(type => ({ type })) }],
                normalize: normalizeListItem,
            },
        ],
    }
}
