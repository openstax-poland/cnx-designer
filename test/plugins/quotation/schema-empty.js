/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <p>Paragraph and an empty quote</p>
        <quote>
        </quote>
    </document>
</value>

export const output = <value>
    <document>
        <p>Paragraph and an empty quote</p>
    </document>
</value>
