/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertFigure(editor, {
    type: 'media_audio',
    src: 'audio.wav',
    intendedUse: 'all',
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
        </media>
    </figure>
</editor>
