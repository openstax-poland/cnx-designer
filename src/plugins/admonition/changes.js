import * as utils from './utils'

export function insertAdmonition(change, type) {
    const admonition = utils.getCurrentAdmonition(change.value)

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
}
