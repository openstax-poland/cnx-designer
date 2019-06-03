// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { NODE_DATA_INVALID } from 'slate-schema-violations'

function normalizeHeading(change, error) {
    const { code: violation, key } = error

    switch (violation) {
    case NODE_DATA_INVALID:
        switch (key) {
        case 'depth':
            change.setNodeByKey
            break

        // In other cases let Slate handle things
        default:
            break
        }

    /* istanbul ignore next */
    default:
        console.warn('Unhandled heading violation:', violation)
        break
    }
}

export default {
    blocks: {
        heading: {
            data: {
                depth: v => typeof v === 'number' && v >= 0,
            },
            marks: [
                { type: 'strong' },
                { type: 'emphasis' },
                { type: 'underline' },
                { type: 'superscript' },
                { type: 'subscript' },
            ],
            normalize: normalizeHeading,
        }
    }
}
