import EditList from 'slate-edit-list'

import * as commands from './commands'
import renderNode from './render'

export default function List(options) {
    const list = EditList(options)
    const plugin = { commands, renderNode }
    return [plugin, list]
}
