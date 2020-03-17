/** @jsx h */

export const input = <editor>
    <exercise>
        <excomment>
            <p>Commentary</p>
        </excomment>
        <exsolution>
            <p>Solution 1</p>
        </exsolution>
        <exproblem>
            <p><cursor/>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution 2</p>
        </exsolution>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p><cursor/>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution 1</p>
        </exsolution>
        <exsolution>
            <p>Solution 2</p>
        </exsolution>
        <excomment>
            <p>Commentary</p>
        </excomment>
    </exercise>
</editor>
