/** @jsx h */

export default input => input.backspace().backspace()

export const input = <editor>
    <p>Before <foreign>Te<cursor/></foreign></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before <cursor/></p>
    <p>After</p>
</editor>

// When typing in empty inlines will be possible
// we would like this test to behave like this:
// export const output = <editor>
//     <p>Before <foreign><cursor/></foreign><text/></p>
//     <p>After</p>
// </editor>
