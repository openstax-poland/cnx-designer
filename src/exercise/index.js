import actions from './actions'
import schema from './schema'
import renderNode from './render'
import onKeyDown from './handlers'
import renderXRef from './xref'


export default function Exercise(options={}) {
    return { actions, schema, renderNode, renderXRef, onKeyDown }
}
