/** @jsx h */

export default input => input.break({ shift: true })

export const input = <editor>
    <code>
        Some<anchor/> <focus/>code
    </code>
</editor>


export const output = <editor>
    <code>Some</code>
    <p><cursor/>code</p>
</editor>
