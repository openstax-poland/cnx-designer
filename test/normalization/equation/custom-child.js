/** @jsx h */

import { Paragraph } from '../../../src'

export const withEditor = editor => {
    editor.isEquationContent = Paragraph.isParagraph
    return editor
}

export const checkSelection = false

export const input = <editor>
    <equation>
        <p>Invalid child</p>
    </equation>
</editor>

export const output = input
