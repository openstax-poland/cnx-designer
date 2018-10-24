/** @jsx h */

export default change => change.insertExercise()

export const input = <value>
    <document>
        <p><cursor/>Exercise</p>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p><cursor/>Exercise</p>
            </exproblem>
        </exercise>
    </document>
</value>
