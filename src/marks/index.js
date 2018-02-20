import renderMark from './render'
import toolbar from './toolbar'

import { Shortcut } from '../util'

import * as changes from './changes'


function core(options) {
    return { renderMark, toolbar }
}


function AddMark(options, defsc, type) {
    return Shortcut(
        options.shortcuts[type] || defsc,
        change => change.addMark(type),
    )
}


export default function Marks(options={}) {
    options.shortcuts = options.shortcuts || {}

    return {
        plugins: [
            AddMark(options, 'mod+b', 'strong'),
            AddMark(options, 'mod+i', 'emphasis'),
            AddMark(options, 'mod+u', 'underline'),
            AddMark(options, 'mod+.', 'superscript'),
            AddMark(options, 'mod+,', 'subscript'),
            Shortcut(options.shortcuts.clear || 'mod+k', changes.removeMarks),
            core(options),
        ],
        changes,
    }
}
