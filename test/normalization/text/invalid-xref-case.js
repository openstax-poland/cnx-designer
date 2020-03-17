/** @jsx h */

export const input = <editor>
    <p>Before<xref target="target" case="invalid"><cursor/></xref>after</p>
</editor>

export const output = <editor>
    <p>Before<xref target="target"><cursor/></xref>after</p>
</editor>
