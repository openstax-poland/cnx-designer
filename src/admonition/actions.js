/** @jsx createMenu */

import createMenu from '../actions'

import * as utils from './utils'


function insertAdmonition(change, type) {
    const admonition = utils.getCurrentAdmonition(change.value)

    if (admonition) {
        change.setNodeByKey(admonition.key, { data: { type } })
    } else {
        change.wrapBlock({
            type: 'admonition',
            data: {
                type: type,
            },
        })
    }
}


function Action({ type, ...attrs }) {
    const title = type.replace(/^\w/, x => x.toUpperCase())
    return <action
        title={title}
        action={change => insertAdmonition(change, type)}
        {...attrs}
        />
}


export default <group category="Insert">
    <Action type="note" />
    <Action type="warning" />
    <Action type="tip" />
    <Action type="important" />
</group>
