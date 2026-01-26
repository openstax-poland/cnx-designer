/** @jsx h */

import { CnxEditor, Paragraph } from '../../../src'

export const withEditor = (editor: CnxEditor) => {
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
