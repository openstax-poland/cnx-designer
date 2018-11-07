// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderEditor from './render'

export default function Storage({ storage }) {
    return {
        renderEditor: renderEditor(storage),
    }
}
