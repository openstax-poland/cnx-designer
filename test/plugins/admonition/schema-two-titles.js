/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <note>
            <block type="title">Note</block>
            <block type="title">More titles</block>
            <p>Note</p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <note>
            <block type="title">NoteMore titles</block>
            <p>Note</p>
        </note>
    </document>
</value>
