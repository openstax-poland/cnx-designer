// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function schema({ marks }) {
    return {
        blocks: {
            paragraph: {
                marks: marks.map(type => ({ type })),
            },
        },
    }
}
