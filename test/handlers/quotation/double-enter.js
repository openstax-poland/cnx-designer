/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <quote>
        <p>Some<anchor/> <focus/>quote</p>
    </quote>
</editor>

export const output = <editor>
    <quote>
        <p>Some</p>
    </quote>
    <p><cursor/>quote</p>
</editor>
