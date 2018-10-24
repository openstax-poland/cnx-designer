/** @jsx h */

export default change => change.insertSolution()

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p><cursor/>Problem</p>
            </exproblem>
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
                <p><text><cursor/></text></p>
            </exsolution>
        </exercise>
    </document>
</value>
