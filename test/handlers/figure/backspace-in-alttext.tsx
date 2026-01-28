/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace()

export const input = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt><cursor/>First picture</mediaalt>
        </media>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt><cursor/>First picture</mediaalt>
        </media>
    </figure>
</editor>
