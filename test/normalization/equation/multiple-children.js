/** @jsx h */

import { Paragraph } from '../../../src'

export const withEditor = editor => {
    editor.isEquationContent = Paragraph.isParagraph
    return editor
}

export const checkSelection = false

export const input = <editor>
    <equation>
        <p>First</p>
        <p>Second</p>
        <p>Third</p>
    </equation>
</editor>

export const output = <editor>
    <equation>
        <p>First</p>
    </equation>
    <equation>
        <p>Second</p>
    </equation>
    <equation>
        <p>Third</p>
    </equation>
</editor>
