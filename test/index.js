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
    editor.change(change, editor)

    if (output) {
        dropKeys(editor.value.document).should.equal(dropKeys(output.document))
    }

    if (output && checkSelection) {
        dropKeys(editor.value.selection).should.equal(dropKeys(output.selection))
    }
}

describe('Plugins', () => {
})
