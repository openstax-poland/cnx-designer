import EditList from 'slate-edit-list'

import { Shortcut } from '../util'

import actions from './actions'
import changes from './changes'
import renderNode from './render'


export default function List(options) {
    const list = EditList(options)

    return {
        plugins: [
            list,
            {
                renderNode,
                actions: actions({ list }),
                ...Shortcut('tab', change => list.changes.wrapInList(change)),
            },
        ],
        changes: changes({ list }),
    }
}
