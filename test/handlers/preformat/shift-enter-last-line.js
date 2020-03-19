/** @jsx h */

export default input => input.break({ shift: true })

export const input = <editor>
    <preformat>
        Some<anchor/> <focus/>preformat
    </preformat>
</editor>


export const output = <editor>
    <preformat>Some</preformat>
    <p><cursor/>preformat</p>
</editor>
