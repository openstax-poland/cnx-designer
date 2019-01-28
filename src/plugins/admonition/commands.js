// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function insertAdmonition(change, type) {
    const admonition = change.getActiveAdmonition(change.value)

    if (admonition) {
        // We don't want nested admonitions, so we just change type of current
        // admonition instead.
        change.setNodeByKey(admonition.key, { data: { type }})
    } else {
        change.wrapBlock({
            type: 'admonition',
            data: { type },
        })
    }

    change.focus()
}
