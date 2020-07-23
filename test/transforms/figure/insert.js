/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertFigure(editor, {
    type: 'media_image',
    src: 'first.png',
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
            <img src="first.png" intendedUse="all">
                <text/>
            </img>
        </media>
    </figure>
</editor>
