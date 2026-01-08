/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <p>
        Before<cursor/>
        <foreign>Text</foreign>
        <text/>
    </p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>
        Before<cursor/>
        <foreign><cursor/>ext</foreign>
        <text/>
    </p>
    <p>After</p>
</editor>
