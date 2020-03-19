/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <note>
        <p>Some<anchor/> <focus/>note</p>
    </note>
</editor>

export const output = <editor>
    <note>
        <p>Some</p>
    </note>
    <p><cursor/>note</p>
</editor>
