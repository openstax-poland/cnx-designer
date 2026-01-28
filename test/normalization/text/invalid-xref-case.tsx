/** @jsx h */

export const input = <editor>
    <p>Before<xref target="target" case={"invalid" as any}><cursor/></xref>after</p>
    <p>Before<docref document="document" case={"invalid" as any}><cursor/></docref>after</p>
</editor>

export const output = <editor>
    <p>Before<xref target="target"><cursor/></xref>after</p>
    <p>Before<docref document="document"><cursor/></docref>after</p>
</editor>
