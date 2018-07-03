import EditList from 'slate-edit-list'

import changes from './changes'
import renderNode from './render'

export default function List(options) {
    const list = EditList(options)

    const core = {
        renderNode,
    }

    return {
        plugins: [
            list,
            core,
        ],
        changes: changes({ list }),
    }
}
