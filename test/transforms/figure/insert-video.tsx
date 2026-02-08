/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertFigure(editor, {
    type: 'media_video',
    src: 'video.mpg',
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
            <video src="video.mpg" intendedUse="all"><text/></video>
            <mediaalt><text/></mediaalt>
        </media>
    </figure>
</editor>
