/** @jsx h */

export default input => input.break({ shift: true })
export const skip = "broken in 8635212 - need to figure out if change in behaviour is intended"

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
