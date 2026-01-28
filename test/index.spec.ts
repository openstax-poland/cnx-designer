import { expect } from 'vitest'
import { Editor } from 'slate'

import './util/h'
import fixtures from './util/fixtures'
import simulateInput, { Simulator } from './util/input'
import { CnxEditor, withCnx } from '../src'

// Force vitest to watch fixtures
import.meta.glob('./normalization/**/*.ts?(x)')
import.meta.glob('./handlers/**/*.ts?(x)')
import.meta.glob('./transforms/**/*.ts?(x)')
import.meta.glob('./behaviours/**/*.ts?(x)')

fixtures(__dirname, 'normalization', ({ input, output, checkSelection = true, ...options }) => {
    const editor = withTest(input, options)
    Editor.normalize(editor, { force: true })
    expect(editor.children).to.deep.eq(output.children)

    if (checkSelection) {
        expect(editor.selection).to.deep.eq(output.selection)
    }
})

fixtures<(input: Simulator, editor: CnxEditor) => void>(__dirname, 'handlers', ({
    default: act,
    input,
    output,
    checkSelection = true,
}) => {
    const editor = withTest(input)
    const simulator = simulateInput(editor)
    act(simulator, editor)
    expect(editor.children).to.deep.eq(output.children)

    if (checkSelection) {
        expect(editor.selection).to.deep.eq(output.selection)
    }
})

fixtures<(editor: CnxEditor) => void>(__dirname, 'transforms', ({
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
fixtures<(editor: CnxEditor) => void>(__dirname, 'behaviours', ({
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

function withTest(
    editor: Editor,
    { withEditor }: {
        withEditor?: (editor: CnxEditor) => CnxEditor,
    } = {},
): CnxEditor {
    let e2 = withCnx(editor)
    if (withEditor != null) {
        e2 = withEditor(e2)
    }
    return e2
}
