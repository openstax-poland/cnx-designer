/** @jsx createMenu */

import createMenu from '../actions'

import { removeMarks } from './changes'


function Action({ type, ...attrs }) {
    const title = type.replace(/^\w/, x => x.toUpperCase())
    return <action
        toggle={true}
        title={title}
        action={change => change.toggleMark(type)}
        active={value => value.activeMarks.some(mark => mark.type === type)}
        {...attrs}
        />
}


export default <group category="Format">
    <Action key="mod+b" type="strong" icon="format_bold" />
    <Action key="mod+i" type="emphasis" icon="format_italic" />
    <Action key="mod+u" type="underline" icon="format_underline" />
    <Action key="mod+." type="superscript" />
    <Action key="mod+," type="subscript" />
    <action title="Clear formatting"
            key="mod+k"
            action={removeMarks}
            enabled={value => !value.activeMarks.isEmpty()}
            icon="format_clear"
            />
</group>
