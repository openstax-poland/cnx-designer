/** @jsx h */

export default input => input.break()

export const input = <editor>
    <section>
        <title>Te<cursor/>st</title>
        <p><text/></p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Te</title>
        <p><cursor/>st</p>
        <p><text/></p>
    </section>
</editor>
