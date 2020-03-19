/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p><cursor/>Solution</p>
        </exsolution>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem<cursor/>Solution</p>
        </exproblem>
    </exercise>
</editor>
