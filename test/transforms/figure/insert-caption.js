/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertCaption(editor, { select: true })

export const input = <editor>
    <figure>
        <media alt="First picture">
            <img src="first.png" intendedUse="all">
                <cursor/>
            </img>
            <mediaalt>First picture</mediaalt>
        </media>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media alt="First picture">
            <img src="first.png" intendedUse="all">
                <text/>
            </img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption><cursor/></caption>
    </figure>
</editor>
