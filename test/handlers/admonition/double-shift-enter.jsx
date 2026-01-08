/** @jsx h */

export default input => input.break({ shift: true }).break({ shift: true })

export const input = <editor>
    <note>
        <p>Some<anchor/> <focus/>note</p>
    </note>
</editor>


export const output = <editor>
    <note>
        <p>Some</p>
        <p><text/></p>
        <p><cursor/>note</p>
    </note>
</editor>
