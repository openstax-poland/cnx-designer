/** @jsx h */

export default input => input.backspace().backspace().backspace()

export const input = <editor>
    <p>Before <footnote>Fo<cursor/>otnote</footnote><text/></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<footnote><cursor/>otnote</footnote><text/></p>
    <p>After</p>
</editor>
