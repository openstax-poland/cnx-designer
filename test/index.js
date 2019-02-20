import 'immutable'
import fs from 'fs'
import path from 'path'
import chai from 'chai'
import { Editor } from 'slate'

global.should = chai.should()
chai.use(require('chai-immutable'))

import './util/h'
import dropKeys from './util/dropKeys'
import fixtures from './util/fixtures'
import CorePlugin from './util/core-plugin'
import PLUGINS from './util/plugins'


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
    fixtures(__dirname, 'plugins/admonition', testPlugin(PLUGINS))
    fixtures(__dirname, 'plugins/exercise', testPlugin(PLUGINS))
    fixtures(__dirname, 'plugins/figure', testPlugin(PLUGINS))
    fixtures(__dirname, 'plugins/list', testPlugin(PLUGINS))
    fixtures(__dirname, 'plugins/text', testPlugin(PLUGINS))
    fixtures(__dirname, 'plugins/section', testPlugin(PLUGINS))
    fixtures(__dirname, 'plugins/title', testPlugin(PLUGINS))
})
