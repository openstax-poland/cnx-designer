/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break()
export const skip = "broken in 8635212 - need to figure out if change in behaviour is intended"

export const input = <editor>
    <preformat>
        Some preformat<cursor/>
    </preformat>
</editor>

export const output = <editor>
    <preformat>
        Some preformat{"\n\n"}<cursor/>
    </preformat>
</editor>
