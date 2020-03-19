/** @jsx h */

export default input => input.backspace().backspace()

export const input = <editor>
    <p>Before <footnote>Fo<cursor/></footnote></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before <footnote><cursor/></footnote><text/></p>
    <p>After</p>
</editor>
