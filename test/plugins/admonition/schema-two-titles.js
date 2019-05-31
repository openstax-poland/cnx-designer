/** @jsx h */

export default editor => editor.normalize()

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
            <title>Note</title>
            <p>More titles</p>
            <p>Note</p>
        </note>
    </document>
</value>
