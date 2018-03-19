import actions from './actions'
import schema from './schema'
import renderNode from './render'
import onKeyDown from './handlers'


export default function Admonition(options={}) {
    return { actions, schema, renderNode, onKeyDown }
}
