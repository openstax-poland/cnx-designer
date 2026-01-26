/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertCaption(editor, { select: true })

export const input = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all">
                <cursor/>
            </img>
            <mediaalt>First picture</mediaalt>
        </media>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all">
                <text/>
            </img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption><cursor/></caption>
    </figure>
</editor>
