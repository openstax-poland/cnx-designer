/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Pro<cursor/>blem</p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Pro</p>
        </exproblem>
        <exsolution>
            <p><cursor/>blem</p>
        </exsolution>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
</editor>
