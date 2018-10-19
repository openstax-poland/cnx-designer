import schema from './schema'
import renderNode from './render'
import onKeyDown from './handlers'
import renderXRef from './xref'
import * as changes from './changes'
import * as queries from './queries'
import * as utils from './utils'

export { changes, utils }

export default function Exercise(options={}) {
    return { changes, queries, utils, schema, renderNode, renderXRef, onKeyDown }
}
