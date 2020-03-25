import chai from 'chai'
import { Editor } from 'slate'
import { withCnx } from '..'

import './util/h'
import fixtures from './util/fixtures'
import withInput from './util/input'

global.should = chai.should()

fixtures(__dirname, 'normalization', ({ input, output, checkSelection = true }) => {
    const editor = withTest(input)
    Editor.normalize(editor, { force: true })
    editor.children.should.deep.eq(output.children)

    if (checkSelection) {
        editor.selection.should.deep.eq(output.selection)
    }
})

fixtures(__dirname, 'handlers', ({
    default: act,
    input,
    output,
    checkSelection = true,
}) => {
    const editor = withTest(input)
    const simulator = withInput(editor)
    act(simulator, editor)
    editor.children.should.deep.eq(output.children)

    if (checkSelection) {
        editor.selection.should.deep.eq(output.selection)
    }
})

fixtures(__dirname, 'transforms', ({
    default: act,
    input,
    output,
    checkSelection = true,
}) => {
    const editor = withTest(input)
    act(editor)
    editor.children.should.deep.eq(output.children)

    if (checkSelection) {
        editor.selection.should.deep.eq(output.selection)
    }
})

// Behaviour tests test Slate's default behaviour, to make sure everything works
// as we would expect. Should any of those tests stop passing we probably need
// to add custom handling for some additional events.
fixtures(__dirname, 'behaviours', ({
    default: act,
    input,
    output,
    checkSelection = true,
}) => {
    const editor = withTest(input)
    act(editor)
    editor.children.should.deep.eq(output.children)

    if (checkSelection) {
        editor.selection.should.deep.eq(output.selection)
    }
})

function withTest(editor) {
    return withCnx(editor)
}
