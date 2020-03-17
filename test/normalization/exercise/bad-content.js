/** @jsx h */

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <p>First bad child</p>
        <exsolution>
            <p>Solution</p>
        </exsolution>
        <p><cursor/>Second bad child</p>
        <excomment>
            <p>Commentary</p>
        </excomment>
        <p>Third bad child</p>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
            <p>First bad child</p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
            <p><cursor/>Second bad child</p>
        </exsolution>
        <excomment>
            <p>Commentary</p>
            <p>Third bad child</p>
        </excomment>
    </exercise>
</editor>
