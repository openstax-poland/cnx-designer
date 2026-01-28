/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>First <cursor/>picture</mediaalt>
        </media>
    </figure>
    <p>After</p>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
    </figure>
    <p><cursor/>After</p>
</editor>
