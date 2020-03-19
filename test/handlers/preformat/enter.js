/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <preformat>
        Some preformat<cursor/>
    </preformat>
</editor>

export const output = <editor>
    <preformat>
        Some preformat{"\n\n"}<cursor/>
    </preformat>
</editor>
