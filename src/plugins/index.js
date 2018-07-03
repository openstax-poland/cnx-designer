import Counters from 'slate-counters'

import Admonition, * as admonition from './admonition'
import Exercise, * as exercise from './exercise'
import Figure, * as figure from './figure'
import List from './list'
import Media from './media'
import Section from './section'
import Text, * as text from './text'
import Title from './title'
import XReference, * as xref from './xref'

const LIST = List()

export default [
    Admonition(),
    Exercise(),
    Figure(),
    Media(),
    Section(),
    Text(),
    Title(),
    Counters(),
    XReference(),
    ...LIST.plugins,
]

export const changes = {
    ...admonition.changes,
    ...exercise.changes,
    ...figure.changes,
    ...text.changes,
    ...xref.changes,
}

export const utils = {
    ...exercise.utils,
    ...figure.utils,
}
