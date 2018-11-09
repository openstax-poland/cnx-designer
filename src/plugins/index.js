import Counters from 'slate-counters'

import Admonition from './admonition'
import Exercise from './exercise'
import Figure from './figure'
import List from './list'
import Media from './media'
import Section from './section'
import Text from './text'
import Title from './title'
import XReference from './xref'

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
