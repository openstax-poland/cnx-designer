import Admonition from '../../src/plugins/admonition'
import Exercise from '../../src/plugins/exercise'
import Figure from '../../src/plugins/figure'
import List from '../../src/plugins/list'
import Media from '../../src/plugins/media'
import Quotation from '../../src/plugins/quotation'
import Section from '../../src/plugins/section'
import Source from '../../src/plugins/source'
import Text from '../../src/plugins/text'
import Title from '../../src/plugins/title'
import XReference from '../../src/plugins/xref'

import CorePlugin from './core-plugin'

export default [
    Admonition(),
    Exercise(),
    Figure(),
    Media(),
    Quotation(),
    Section(),
    Source(),
    Text(),
    Title(),
    XReference(),
    List(),
    CorePlugin(),
]
