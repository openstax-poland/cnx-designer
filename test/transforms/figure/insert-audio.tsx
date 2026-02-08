/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertFigure(editor, {
    type: 'media_audio',
    src: 'audio.wav',
    intendedUse: 'all',
    children: [],
})

export const checkSelection = false

export const input = <editor>
    <p><cursor/></p>
</editor>

export const output = <editor>
    <p><text/></p>
    <figure>
        <media>
            <audio src="audio.wav" intendedUse="all"><text/></audio>
            <mediaalt><text/></mediaalt>
        </media>
    </figure>
</editor>
