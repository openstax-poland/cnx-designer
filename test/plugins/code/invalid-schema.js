/** @jsx h */

/* eslint-disable max-len */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p>Some <codeinline>code <term>Term</term></codeinline></p>
        <code>
            Some code
            <p>Para</p>
        </code>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some <codeinline>code </codeinline><text/><term index="default">Term</term><text/></p>
        <code>
            Some code
        </code>
    </document>
</value>
