/** @jsx h */

import { Editor } from 'slate'

export default input => input.delete()

export const input = <editor>
    <figure id="f1">
        <figure>
            <media>
                <img src="first.png" intendedUse="all">
                    <cursor/>
                </img>
                <mediaalt>First picture</mediaalt>
            </media>
            <caption>First figure</caption>
        </figure>
        <figure>
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Second picture</mediaalt>
            </media>
            <caption>Second figure</caption>
        </figure>
        <caption>Main caption</caption>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <media>
            <img src="second.png" intendedUse="all">
                <cursor/>
            </img>
            <mediaalt>Second picture</mediaalt>
        </media>
        <caption>Second figureMain caption</caption>
    </figure>
</editor>
