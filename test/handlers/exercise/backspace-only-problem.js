/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <p>Before</p>
    <exercise>
        <exproblem>
            <p><cursor/>Exercise</p>
        </exproblem>
    </exercise>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Exercise</p>
    <p>After</p>
</editor>
