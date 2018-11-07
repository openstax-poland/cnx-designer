// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeSection(change, error) {
    const { code } = error

    // TODO: insert default title when missing
    switch (code) {
    default:
        console.warn('Unhandled violation in section:', code)
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
            normalize: normalizeSection,
        }
    }
}
