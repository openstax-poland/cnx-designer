/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
        <excomment>
            <p>Commentary</p>
        </excomment>
    </document>
</value>

export const output = <value>
    <document>
        <p>Problem</p>
        <p>Solution</p>
        <p>Commentary</p>
    </document>
</value>
