import { Editor } from 'slate'
import { JSDOM } from 'jsdom'

import '../util/cnxml'
import compareHtml from '../util/compareHtml'
import dropKeys from '../util/dropKeys'
import fixtures from '../util/fixtures'
import CNXML from '../../src/cnxml'
import { CONTENT_PLUGINS, GLOSSARY_PLUGINS } from '../util/plugins'

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

const serializer = new CNXML({ documentRules: [], glossaryRules: [] })

function testDeserialization({ input, outputContent, outputGlossary }) {
    const { document, glossary } = serializer.deserialize(input)
    const editorContent = new Editor({
        value: document,
        plugins: CONTENT_PLUGINS,
    })
    const editorGlossary = new Editor({
        value: glossary,
        plugins: GLOSSARY_PLUGINS,
    })

    if (outputContent) {
        dropKeys(editorContent.value.document)
            .should.equal(dropKeys(outputContent.document))
    }

    if (outputGlossary) {
        dropKeys(editorGlossary.value.document)
            .should.equal(dropKeys(outputGlossary.document))
    }
}

function testSerialization({ inputContent, inputGlossary, output }) {
    const contentValue = inputContent ? dropKeys(inputContent) : null
    const glossaryValue = inputGlossary ? dropKeys(inputGlossary) : null

    const serialized = serializer.serialize(
        contentValue, glossaryValue, { toString: false })
    const referenceXml = new DOMParser().parseFromString(
        output, 'application/xml')

    const error = referenceXml.getElementsByTagName('parsererror')
    if (error[0]) {
        throw new Error('Invalid XML:' + error[0].textContent)
    }

    if (contentValue) {
        const resultContent = serialized.getElementsByTagName('content')[0]
        const referenceContent = referenceXml.querySelector(':root > content')

        compareHtml(dom, resultContent, referenceContent)
    }

    if (glossaryValue) {
        const resultGlossary = serialized.getElementsByTagName('glossary')[0]
        const referenceGlossary = referenceXml.querySelector(':root > glossary')

        compareHtml(dom, resultGlossary, referenceGlossary)
    }
}

describe('CNXML', () => {
    fixtures(__dirname, 'de', testDeserialization)
    fixtures(__dirname, 'se', testSerialization)
})

