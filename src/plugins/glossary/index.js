// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import make_schema from './schema'

export default function Glossary(options={}) {
    const {
        content = ['definition'],
    } = options

    const schema = make_schema({ content })

    return { schema }
}
