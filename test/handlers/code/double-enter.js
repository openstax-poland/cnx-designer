/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <code>
        Some code<cursor/>
    </code>
</editor>

export const output = <editor>
    <code>
        Some code{"\n\n"}<cursor/>
    </code>
</editor>
