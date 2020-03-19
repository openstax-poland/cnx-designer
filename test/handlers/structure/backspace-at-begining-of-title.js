/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <section>
        <title>First</title>
        <p>Inside first</p>
    </section>
    <section>
        <title><cursor/>Second</title>
        <p>Inside second</p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>First</title>
        <p>Inside first<cursor/>Second</p>
        <p>Inside second</p>
    </section>
</editor>
