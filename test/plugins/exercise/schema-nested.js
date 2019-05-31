/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Before</p>
                <exercise>
                    <exproblem>
                        <p>Problem</p>
                    </exproblem>
                    <exsolution>
                        <p>Solution</p>
                    </exsolution>
                </exercise>
                <p>After</p>
            </exproblem>
        </exercise>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Before</p>
                <p>Problem</p>
                <p>Solution</p>
                <p>After</p>
            </exproblem>
        </exercise>
    </document>
</value>
