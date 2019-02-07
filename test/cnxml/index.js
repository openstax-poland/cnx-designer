import { Editor } from 'slate'
import { JSDOM } from 'jsdom'

import '../util/cnxml'
import dropKeys from '../util/dropKeys'
import fixtures from '../util/fixtures'

import CNXML from '../../src/cnxml'
import Admonition from '../../src/plugins/admonition'
import Exercise from '../../src/plugins/exercise'
import Figure from '../../src/plugins/figure'
import List from '../../src/plugins/list'
import Section from '../../src/plugins/section'
import Text from '../../src/plugins/text'
import Title from '../../src/plugins/title'
import XReference from '../../src/plugins/xref'

// While JSDOM recommends against doing this, we have no other way of passing
// DOMParser and XMLSerializer.
const dom = new JSDOM(null, {
    url: 'https://example.test/',
    referrer: 'https://example.test/',
})
global.DOMParser = dom.window.DOMParser
global.XMLSerializer = dom.window.XMLSerializer

const plugins = [
    Admonition(),
    Exercise(),
    Figure(),
    Section(),
    Text(),
    Title(),
    XReference(),
    List(),
]

function testDeserialization({ input, output }) {
    const editor = new Editor({
        value: CNXML.deserialize(input),
        plugins,
    })

    if (output) {
        dropKeys(editor.value.document).should.equal(dropKeys(output.document))
    }
}

describe('CNXML', () => {
    fixtures(__dirname, 'de', testDeserialization)
})

