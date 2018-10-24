import schema from './schema'
import * as commands from './commands'
import { renderNode, renderMark } from './render'

export default function Text() {
    return { commands, renderNode, renderMark, schema }
}
