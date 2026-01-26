/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete().delete().delete()

export const input = <editor>
    <p>Before <footnote>Footno<cursor/>te</footnote><text/></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before <footnote>Footno</footnote><cursor/>After</p>
</editor>
