import schema from './schema'
import renderNode from './render'
import actions from './actions'


export default function Admonition(options={}) {
    return { schema, renderNode, actions }
}
