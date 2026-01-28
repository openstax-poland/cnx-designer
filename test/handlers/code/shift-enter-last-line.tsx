/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break({ shift: true })
export const skip = "broken in 8635212 - need to figure out if change in behaviour is intended"

export const input = <editor>
    <code>
        Some<anchor/> <focus/>code
    </code>
</editor>

export const output = <editor>
    <code>Some</code>
    <p><cursor/>code</p>
</editor>
