import { Editor } from 'slate'

import '../util/h'
import dropKeys from '../util/dropKeys'
import fixtures from '../util/fixtures'
import { CONTENT_PLUGINS, GLOSSARY_PLUGINS } from '../util/plugins'

const testPlugin = plugins => ({
    default: change,
    input,
    output,
    checkSelection=true,
}) => {
    const editor = new Editor({
        value: input,
        plugins,
    })
    editor.command(change)

    if (output) {
        dropKeys(editor.value.document)
            .should.equal(dropKeys(output.document))
    }

    if (output && checkSelection) {
        dropKeys(editor.value.selection)
            .should.equal(dropKeys(output.selection))
    }
}

describe('Plugins', () => {
    fixtures(__dirname, 'admonition', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'code', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'classes', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'definition', testPlugin(GLOSSARY_PLUGINS))
    fixtures(__dirname, 'exercise', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'figure', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'footnote', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'foreign', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'list', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'preformat', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'quotation', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'section', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'term', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'text', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'title', testPlugin(CONTENT_PLUGINS))
    fixtures(__dirname, 'xref', testPlugin(CONTENT_PLUGINS))
})
