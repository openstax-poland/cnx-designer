/** @jsx h */

export const input = <editor>
    <section>
        <title>Previous</title>
        <p>Previous section</p>
    </section>
    <section>
        <p key="p1"><cursor/>In section</p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Previous</title>
        <p>Previous section</p>
        <p key="p1"><cursor/>In section</p>
    </section>
</editor>
