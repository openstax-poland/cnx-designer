import { Editor } from 'slate'
import { JSDOM } from 'jsdom'

import '../util/cnxml'
import compareHtml from '../util/compareHtml'
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
global.document = dom.window.document
global.DOMParser = dom.window.DOMParser
global.XMLSerializer = dom.window.XMLSerializer
global.Node = dom.window.Node

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

function testSerialization({ input, output }) {
    const result = CNXML.serialize(dropKeys(input), { toString: false })
        .getElementsByTagName('content')[0]

    const referenceXml = new DOMParser().parseFromString(output, 'application/xml')
    const reference = referenceXml.querySelector(':root > content')

    if (reference == null) {
        const error = referenceXml.getElementsByTagName('parsererror')
        throw new Error('Invalid XML:' + error[0].textContent)
    }

    compareHtml(dom, result, reference)
}

describe('CNXML', () => {
    fixtures(__dirname, 'de', testDeserialization)
    fixtures(__dirname, 'se', testSerialization)
})

