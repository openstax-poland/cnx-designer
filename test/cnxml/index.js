import { createEditor } from 'slate'
import { JSDOM } from 'jsdom'
import { CNXML, withCnx } from '../..'

import '../util/cnxml'
import compareHtml from '../util/compareHtml'
import fixtures from '../util/fixtures'

// While JSDOM recommends against doing this, we have no other way of passing
// DOMParser and XMLSerializer.
const dom = new JSDOM(null, {
    url: 'https://example.test/',
    referrer: 'https://example.test/',
})
global.window = dom.window
global.window.crypto = {
    getRandomValues: require('crypto').randomFillSync,
}
global.document = dom.window.document
global.DOMParser = dom.window.DOMParser
global.XMLSerializer = dom.window.XMLSerializer
global.Node = dom.window.Node

describe('CNXML', () => {
    fixtures(__dirname, 'de', ({ input, output, errors = [], withEditor }) => {
        const reportedErrors = []

        CNXML.deserialize(editor => {
            editor.reportError = (type, details) => {
                reportedErrors.push(details == null ? type : [type, details])
            }
            editor = withCnx(editor)

            if (withEditor != null) {
                editor = withEditor(editor)
            }

            return editor
        }, input).should.deep.equal(output)

        reportedErrors.should.deep.equal(errors)
    })

    fixtures(__dirname, 'se', ({ input, output, serializeNode }) => {
        const editor = withCnx(createEditor())
        const serialized = CNXML.serialize(editor, {
            language: 'en',
            title: 'Test',
            moduleId: 'test',
            version: '0.7',
            content: input,
        }, {
            format: 'dom',
            mediaMime,
            serializeNode,
        })

        const reference = new DOMParser().parseFromString(output, 'application/xml')

        const [error] = reference.getElementsByName('parsererror')
        if (error) {
            throw new Error('Invalid XML:' + error.textContent)
        }

        compareHtml(dom, serialized, reference)
    })
})

function mediaMime(media) {
    return {
        'png': 'image/png',
        'wav': 'audio/x-wav',
        'mpg': 'video/mpeg',
    }[media.src.split('.').pop()]
}
