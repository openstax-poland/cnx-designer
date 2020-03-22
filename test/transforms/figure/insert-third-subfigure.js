/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertSubfigure(editor, {
    type: 'media_image',
    src: 'third.png',
    intendedUse: 'all',
})

export const checkSelection = false

export const input = <editor>
    <figure>
        <figure>
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
            <caption><cursor/>Caption</caption>
        </figure>
        <figure>
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Second picture</mediaalt>
            </media>
        </figure>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <figure>
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
            <caption>Caption</caption>
        </figure>
        <figure>
            <media>
                <img src="third.png" intendedUse="all"><text/></img>
            </media>
        </figure>
        <figure>
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Second picture</mediaalt>
            </media>
        </figure>
    </figure>
</editor>
