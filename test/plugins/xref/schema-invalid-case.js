/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p>Before<xref target="target" case="invalid"><cursor/></xref>after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<xref target="target"><cursor/></xref>after</p>
    </document>
</value>
