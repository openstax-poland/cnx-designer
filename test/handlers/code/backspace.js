/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <p>Before</p>
    <code><cursor/>Some code</code>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Some code</p>
    <p>After</p>
</editor>
