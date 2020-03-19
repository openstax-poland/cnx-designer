/** @jsx h */

export default input => input.break({ shift: true }).break({ shift: true })

export const input = <editor>
    <quote>
        <p>Some<anchor/> <focus/>quote</p>
    </quote>
</editor>


export const output = <editor>
    <quote>
        <p>Some</p>
        <p><text/></p>
        <p><cursor/>quote</p>
    </quote>
</editor>
