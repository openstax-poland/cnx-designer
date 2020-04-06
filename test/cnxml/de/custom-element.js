/** @jsx h */

import { CNXML } from '../../..'

export const input = cnxml`
<t:custom xmlns:t="urn:test" attr="12">Custom <emphasis effect="bold">node</emphasis></t:custom>
`

export const output = <document>
    <element type="custom" attr={12}>Custom <b>node</b></element>
</document>

export function withEditor(editor) {
    const { deserializeElement } = editor

    editor.deserializeElement = (el, at, ctx) => {
        if (el.namespaceURI === 'urn:test' && el.localName === 'custom') {
            CNXML.buildElement(editor, el, at, {
                type: 'custom',
                attr: Number(el.getAttribute('attr')),
            }, CNXML.INLINE)
            CNXML.normalizeLine(editor, at)
            return
        }

        return deserializeElement(el, at, ctx)
    }

    return editor
}
