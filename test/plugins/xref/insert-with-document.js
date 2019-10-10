/** @jsx h */

/* eslint-disable max-len */

export default editor => editor.insertXref('target', 'document')

export const input = <value>
    <document>
        <p>Before<cursor/>after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<xref target="target" document="document"><cursor/></xref>after</p>
    </document>
</value>
