import { removeMarks } from './changes'

import Toolbar from '../components/Toolbar'


function button(title, type) {
    return {
        [type]: {
            title,
            change: change => change.addMark(type)
        }
    }
}


export default {
    mark: {
        ...button("Strong", 'strong'),
        ...button("Emphasis", 'emphasis'),
        ...button("Underline", 'underline'),
        ...button("Superscript", 'superscript'),
        ...button("Subscript", 'subscript'),
        clear: {
            title: "Clear formatting",
            change: removeMarks,
        }
    }
}
