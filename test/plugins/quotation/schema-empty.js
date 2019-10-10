/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p>Paragraph and an empty quote</p>
        <quote/>
    </document>
</value>

export const output = <value>
    <document>
        <p>Paragraph and an empty quote</p>
    </document>
</value>
