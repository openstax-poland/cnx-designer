/** @jsx h */

export default input => input.break()

export const input = <editor>
    <note>
        <p>
            <text>before</text>
            <xref><text/></xref>
            <text><cursor/>after</text>
        </p>
    </note>
</editor>

export const output = <editor>
    <note>
        <p>
            <text>before</text>
            <xref><text/></xref>
            <text/>
        </p>
        <p>
            <text><cursor/>after</text>
        </p>
    </note>
</editor>
