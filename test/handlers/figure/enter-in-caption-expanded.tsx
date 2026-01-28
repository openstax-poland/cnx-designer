/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Cap<anchor/>ti<focus/>on</caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Cap</caption>
    </figure>
    <p><cursor/>on</p>
</editor>
