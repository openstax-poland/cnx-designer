/** @jsx h */

export default editor => editor.insertCommentary()

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
            <excomment>
                <p><text><cursor/></text></p>
            </excomment>
        </exercise>
    </document>
</value>
