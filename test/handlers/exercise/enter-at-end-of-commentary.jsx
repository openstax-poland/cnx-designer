/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p>Commentary<cursor/></p>
        </excomment>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p>Commentary</p>
        </excomment>
    </exercise>
    <p><cursor/></p>
</editor>
