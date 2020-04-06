/** @jsx h */

export const input = cnxml`
<section id="s1">
    <title>Section</title>
    <para>This is a section</para>
    <section id="s2">
        <title>Another section</title>
        <para>This is a sub-section</para>
    </section>
</section>
<section id="s3">
    <title>One more section</title>
    <para>Only sections can follow sections</para>
</section>
`

export const output = <document>
    <section id="s1">
        <title>Section</title>
        <p>This is a section</p>
        <section id="s2">
            <title>Another section</title>
            <p>This is a sub-section</p>
        </section>
    </section>
    <section id="s3">
        <title>One more section</title>
        <p>Only sections can follow sections</p>
    </section>
</document>
