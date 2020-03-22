/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertFigure(editor, {
    type: 'media_video',
    src: 'video.mpg',
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
            <video src="video.mpg" intendedUse="all"><text/></video>
        </media>
    </figure>
</editor>
