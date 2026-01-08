import { expect } from 'vitest'
import { Editor } from 'slate'
import { withCnx } from '../src'

import './util/h'
import fixtures from './util/fixtures'
import withInput from './util/input'

// Force vitest to watch fixtures
import.meta.glob('./normalization/**/*.js?(x)')
import.meta.glob('./handlers/**/*.js?(x)')
import.meta.glob('./transforms/**/*.js?(x)')
import.meta.glob('./behaviours/**/*.js?(x)')

fixtures(__dirname, 'normalization', ({ input, output, checkSelection = true, ...options }) => {
    const editor = withTest(input, options)
    Editor.normalize(editor, { force: true })
    expect(editor.children).to.deep.eq(output.children)

    if (checkSelection) {
        expect(editor.selection).to.deep.eq(output.selection)
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
    expect(editor.children).to.deep.eq(output.children)

    if (checkSelection) {
        expect(editor.selection).to.deep.eq(output.selection)
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
    expect(editor.children).to.deep.eq(output.children)

    if (checkSelection) {
        expect(editor.selection).to.deep.eq(output.selection)
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
    expect(editor.children).to.deep.eq(output.children)

    if (checkSelection) {
        expect(editor.selection).to.deep.eq(output.selection)
    }
})

function withTest(editor, { withEditor } = {}) {
    editor = withCnx(editor)
    if (withEditor != null) {
        editor = withEditor(editor)
    }
    return editor
}
