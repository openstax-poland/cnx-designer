/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <exercise>Bare text</exercise>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <p>First bad child</p>
            <exsolution>
                <p>Solution</p>
            </exsolution>
            <p>Second bad child</p>
            <excomment>
                <p>Commentary</p>
            </excomment>
            <p>Third bad child</p>
        </exercise>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <exsolution>
                <p>First bad child</p>
            </exsolution>
            <exsolution>
                <p>Solution</p>
            </exsolution>
            <exsolution>
                <p>Second bad child</p>
            </exsolution>
            <excomment>
                <p>Commentary</p>
                <p>Third bad child</p>
            </excomment>
        </exercise>
    </document>
</value>
