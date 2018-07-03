import schema from './schema'
import renderNode from './render'
import * as changes from './changes'

export { changes }

export default function XReference(options={}) {
    return { changes, schema, renderNode }
}
