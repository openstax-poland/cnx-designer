/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <note>
            <title>Note</title>
            <title>More titles</title>
            <p>Note</p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <note>
            <title>NoteMore titles</title>
            <p>Note</p>
        </note>
    </document>
</value>
