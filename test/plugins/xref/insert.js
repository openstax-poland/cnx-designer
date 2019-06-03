/** @jsx h */

export default editor => editor.insertXref('target')

export const input = <value>
    <document>
        <p>Before<anchor/>inside<focus/>after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<xref target="target"><cursor/></xref>after</p>
    </document>
</value>
