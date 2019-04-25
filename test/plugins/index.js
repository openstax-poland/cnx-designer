import { Editor } from 'slate'

import '../util/h'
import dropKeys from '../util/dropKeys'
import fixtures from '../util/fixtures'
import PLUGINS from '../util/plugins'

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
    editor.command(change, editor)

    if (output) {
        dropKeys(editor.value.document).should.equal(dropKeys(output.document))
    }

    if (output && checkSelection) {
        dropKeys(editor.value.selection).should.equal(dropKeys(output.selection))
    }
}

describe('Plugins', () => {
    fixtures(__dirname, 'admonition', testPlugin(PLUGINS))
    fixtures(__dirname, 'exercise', testPlugin(PLUGINS))
    fixtures(__dirname, 'figure', testPlugin(PLUGINS))
    fixtures(__dirname, 'list', testPlugin(PLUGINS))
    fixtures(__dirname, 'quotation', testPlugin(PLUGINS))
    fixtures(__dirname, 'section', testPlugin(PLUGINS))
    fixtures(__dirname, 'source', testPlugin(PLUGINS))
    fixtures(__dirname, 'text', testPlugin(PLUGINS))
    fixtures(__dirname, 'title', testPlugin(PLUGINS))
})
