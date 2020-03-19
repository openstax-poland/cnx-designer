/** @jsx h */

export default input => input.break()

export const input = <editor>
    <note>
        <p>first</p>
        <p><cursor/>second</p>
        <p>third</p>
    </note>
</editor>

export const output = <editor>
    <note>
        <p>first</p>
    </note>
    <p><cursor/>second</p>
    <note>
        <p>third</p>
    </note>
</editor>
