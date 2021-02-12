/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertSubfigure(editor, {
    type: 'media',
    children: [
        {
            type: 'media_image',
            src: 'third.png',
            intendedUse: 'all',
            children: []
        },
        {
            type: 'media_alt',
            children: [{ text: 'Third picture' }]
        }
    ]
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
                <mediaalt>Third picture</mediaalt>
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
