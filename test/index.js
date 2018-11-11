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

import Admonition from '../src/plugins/admonition'
import Exercise from '../src/plugins/exercise'
import Figure from '../src/plugins/figure'
import List from '../src/plugins/list'
import Text from '../src/plugins/text'

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
    fixtures(__dirname, 'plugins/admonition', testPlugin([Admonition(), CorePlugin()]))
    fixtures(__dirname, 'plugins/exercise', testPlugin([Exercise(), CorePlugin()]))
    fixtures(__dirname, 'plugins/figure', testPlugin([Figure()]))
    fixtures(__dirname, 'plugins/list', testPlugin([List()]))
    fixtures(__dirname, 'plugins/text', testPlugin([Text()]))
})
