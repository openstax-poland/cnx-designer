/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertSubfigure(editor, {
    type: 'media_image',
    src: 'second.png',
    intendedUse: 'all',
})

export const checkSelection = false

export const input = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption><cursor/>Caption</caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <figure>
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
        </figure>
        <figure>
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
            </media>
        </figure>
        <caption>Caption</caption>
    </figure>
</editor>
