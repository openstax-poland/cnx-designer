/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <p>Before</p>
    <quote>
        <p><cursor/>Some note</p>
    </quote>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Some note</p>
    <p>After</p>
</editor>
