/** @jsx h */

export default input => input.backspace().backspace()

export const input = <editor>
    <p>Before <term>Te<cursor/></term></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before <term><cursor/></term><text/></p>
    <p>After</p>
</editor>
