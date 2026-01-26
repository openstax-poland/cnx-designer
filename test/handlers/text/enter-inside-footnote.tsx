/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <p>Before <footnote>foot<cursor/>note</footnote> after</p>
</editor>

export const output = <editor>
    <p>Before <footnote>foot</footnote><text/></p>
    <p><text/><footnote><cursor/>note</footnote> after</p>
</editor>
