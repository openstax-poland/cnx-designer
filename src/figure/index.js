import schema from './schema'
import renderNode from './render'
import actions from './actions'
import renderXRef from './xref'


export default function Figure(options) {
    return { schema, renderNode, renderXRef, actions }
}
