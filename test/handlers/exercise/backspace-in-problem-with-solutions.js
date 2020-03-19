/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <p>Before</p>
    <exercise>
        <exproblem>
            <p><cursor/>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Problem</p>
    <exercise>
        <exproblem>
            <p><text/></p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
    <p>After</p>
</editor>

