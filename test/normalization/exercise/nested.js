/** @jsx h */

export const input = <editor>
    <exercise>
        <exproblem>
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
        </exproblem>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Before</p>
            <p><cursor/>Problem</p>
            <p>Solution</p>
            <p>After</p>
        </exproblem>
    </exercise>
</editor>
