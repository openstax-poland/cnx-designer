import schema from './schema'
import renderNode from './render'
import renderXRef from './xref'
import * as changes from './changes'
import * as queries from './queries'
import * as utils from './utils'

export { changes, utils }

export default function Figure(options) {
    return { changes, queries, utils, schema, renderNode, renderXRef }
}
