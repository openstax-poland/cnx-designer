import actions from './actions'
import schema from './schema'
import renderNode from './render'

export default function XReferences(options={}) {
    return { schema, renderNode, actions }
}
