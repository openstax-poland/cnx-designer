/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <p>Before</p>
    <preformat>
        <cursor/>Some preformat
        {'\n'}next line
        {'\n'}another line
    </preformat>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Some preformat</p>
    <preformat>
        next line
        {'\n'}another line
    </preformat>
    <p>After</p>
</editor>
