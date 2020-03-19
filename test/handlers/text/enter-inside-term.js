/** @jsx h */

export default input => input.break()

export const input = <editor>
    <p>Before <term>te<cursor/>rm</term> after</p>
</editor>

export const output = <editor>
    <p>Before <term>te</term><text/></p>
    <p><text/><term><cursor/>rm</term> after</p>
</editor>
