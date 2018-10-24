import schema from './schema'
import renderNode from './render'
import renderXRef from './xref'
import * as commands from './commands'
import * as queries from './queries'

export default function Figure(options) {
    return { commands, queries, schema, renderNode, renderXRef }
}
