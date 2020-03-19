/** @jsx h */

export default input => input.break({ shift: true })

export const input = <editor>
    <preformat>
        Some<anchor/> <focus/>preformat{"\n"}more lines
    </preformat>
</editor>


export const output = <editor>
    <preformat>Some</preformat>
    <p><cursor/>preformat</p>
    <preformat>more lines</preformat>
</editor>
