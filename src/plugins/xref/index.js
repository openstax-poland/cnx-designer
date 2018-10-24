import schema from './schema'
import renderNode from './render'
import * as commands from './commands'

export default function XReference(options={}) {
    return { commands, schema, renderNode }
}
