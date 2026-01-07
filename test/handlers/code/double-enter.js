/** @jsx h */

export default input => input.break().break()
export const skip = "broken in 8635212 - need to figure out if change in behaviour is intended"

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
