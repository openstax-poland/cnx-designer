import chai from 'chai'
import { Editor } from 'slate'
import { withCnx } from '..'

import './util/h'
import fixtures from './util/fixtures'

global.should = chai.should()

fixtures(__dirname, 'normalization', ({ input, output, checkSelection = true }) => {
    const editor = withTest(input)
    Editor.normalize(editor, { force: true })
    editor.children.should.deep.eq(output.children)

    if (checkSelection) {
        editor.selection.should.deep.eq(output.selection)
    }
})

function withTest(editor) {
    return withCnx(editor)
}
