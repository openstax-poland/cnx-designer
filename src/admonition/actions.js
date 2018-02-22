/** @jsx createMenu */

import createMenu from '../actions'


function Action({ type, ...attrs }) {
    const title = type.replace(/^\w/, x => x.toUpperCase())
    return <action
        title={title}
        action={change => change.wrapBlock({
            type: 'admonition',
            data: {
                type: type,
            },
        })}
        {...attrs}
        />
}


export default <group category="Insert">
    <Action type="note" />
    <Action type="warning" />
    <Action type="tip" />
    <Action type="important" />
</group>
