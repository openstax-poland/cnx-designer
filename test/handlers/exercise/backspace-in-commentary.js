/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
        <excomment>
            <p><cursor/>Comment</p>
        </excomment>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution<cursor/>Comment</p>
        </exsolution>
    </exercise>
</editor>
