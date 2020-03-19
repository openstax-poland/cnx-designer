/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <p>Before</p>
    <preformat><cursor/>Some preformat</preformat>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Some preformat</p>
    <p>After</p>
</editor>
