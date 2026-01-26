/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <p>Before <foreign>te<cursor/>xt</foreign> after</p>
</editor>

export const output = <editor>
    <p>Before <foreign>te</foreign><text/></p>
    <p><text/><foreign><cursor/>xt</foreign> after</p>
</editor>
