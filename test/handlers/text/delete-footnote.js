/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <p>
        Before<cursor/>
        <footnote>Footnote</footnote>
        <text/>
    </p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>
        Before
        <footnote><cursor/>ootnote</footnote>
        <text/>
    </p>
    <p>After</p>
</editor>
