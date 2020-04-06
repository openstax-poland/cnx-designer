import { CNXML } from '../../..'

export const input = [
    {
        type: 'custom',
        attr: 12,
        children: [
            { text: 'Custom ' },
            { text: 'node', strong: true },
        ],
    },
]

export const output = cnxml`
<t:custom xmlns:t="urn:test" attr="12">Custom <emphasis effect="bold">node</emphasis></t:custom>
`

export function serializeNode(node, attrs, children) {
    if (node.type !== 'custom') {
        return null
    }

    return CNXML.JSX.createElement('custom', {
        ...attrs,
        xmlns: 'urn:test',
        attr: node.attr,
    }, children)
}
