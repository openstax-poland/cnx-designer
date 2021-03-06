/** @jsx h */

export default input => input.backspace().backspace().backspace()

export const input = <editor>
    <p>Text<codeline>So<cursor/>me code</codeline></p>
</editor>

export const output = <editor>
    <p>Tex<cursor/><codeline>me code</codeline><text/></p>
</editor>
