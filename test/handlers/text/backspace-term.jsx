/** @jsx h */

export default input => input.backspace().backspace()

export const input = <editor>
    <p>Before <term>Te<cursor/></term></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before <cursor/></p>
    <p>After</p>
</editor>

// When typing in empty inlines will be possible
// we would like this test to behave like this:
// export const output = <editor>
//     <p>Before <term><cursor/></term><text/></p>
//     <p>After</p>
// </editor>
