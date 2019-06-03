/** @jsx h */

export default editor => editor.insertExercise()

export const input = <value>
    <document>
        <note>
            <p>A note<cursor/></p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>A note<cursor/></p>
            </exproblem>
        </exercise>
    </document>
</value>
