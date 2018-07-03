import schema from './schema'
import * as changes from './changes'
import { renderNode, renderMark } from './render'

export { changes }

export default function Text() {
    return { changes, renderNode, renderMark, schema }
}
