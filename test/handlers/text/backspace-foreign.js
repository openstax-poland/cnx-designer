/** @jsx h */

export default input => input.backspace().backspace()

export const input = <editor>
    <p>Before <foreign>Te<cursor/></foreign></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before <foreign><cursor/></foreign><text/></p>
    <p>After</p>
</editor>
