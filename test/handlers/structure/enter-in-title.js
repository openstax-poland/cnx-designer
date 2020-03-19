/** @jsx h */

export default input => input.break()

export const input = <editor>
    <section>
        <title>Sec<cursor/>tion</title>
        <p>Paragraph</p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Sec</title>
        <p><cursor/>tion</p>
        <p>Paragraph</p>
    </section>
</editor>
