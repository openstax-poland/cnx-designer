import actions from './actions'
import onKeyDown from './handlers'
import renderNode from './render'
import schema from './schema'


export default function Admonition(options={}) {
    return { schema, onKeyDown, renderNode, actions }
}
