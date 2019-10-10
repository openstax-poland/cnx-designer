// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

// Admonition types supported by both CNXML's <note> and HTMLBook. Missing are
// `aside` from CNXML and `caution` from HTMLBook.
const TYPES = ["note", "warning", "tip", "important"]

function normalizeAdmonition(change, error) {
    const { code, node, child } = error

    switch (code) {
    // Admonition type is not valid.
    case 'node_data_invalid':
        // By default slate removes all nodes that failed validation, but we
        // only want the admonition gone, not its contents.
        change.unwrapBlockByKey(node.key)
        break

    case 'child_max_invalid':
        if (child.type === 'title') {
            change.setNodeByKey(child.key, 'paragraph')
            return
        }
        console.warn('Unhandled admonition violation:', code)
        break

    case 'child_type_invalid':
        // Sometimes title is not first element. We want to change it to
        // paragraph, because moving it to 0 index could be confusing for
        // translators.
        if (child.type === 'title') {
            change.setNodeByKey(child.key, 'paragraph')
            return
        }
        console.warn('Unhandled admonition violation:', code)
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled admonition violation:', code)
        break
    }
}

export default function schema({ title, content }) {
    const content_types = content.map(type => ({ type }))

    return {
        blocks: {
            admonition: {
                data: {
                    type: v => TYPES.includes(v),
                },
                nodes: [
                    { match: { type: title }, min: 0, max: 1 },
                    { match: content_types },
                ],
                normalize: normalizeAdmonition,
            },
        },
    }
}
