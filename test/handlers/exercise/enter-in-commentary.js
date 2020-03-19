/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p>Com<cursor/>ment</p>
        </excomment>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p>Com</p>
        </excomment>
    </exercise>
    <p><cursor/>ment</p>
</editor>
