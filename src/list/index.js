import EditList from 'slate-edit-list'

import { Shortcut } from '../util'

import renderNode from './render'


export default function List(options) {
    const list = EditList(options)

    return {
        plugins: [
            list,
            {
                renderNode,
                ...Shortcut('tab', change => list.changes.wrapInList(change)),
            },
        ],
    }
}
