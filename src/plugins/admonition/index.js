import onKeyDown from './handlers'
import renderNode from './render'
import schema from './schema'
import * as changes from './changes'

export { changes }

export default function Admonition() {
    return { changes, schema, onKeyDown, renderNode }
}
