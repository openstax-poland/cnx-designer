/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <exercise id="e1">
        <exproblem>
            <p>This is a problem</p>
            <p>It has multiple paragraphs</p>
        </exproblem>
        <excomment>
            <p>This exercise has no solutions</p>
        </excomment>
    </exercise>
    <exercise id="e2">
        <exproblem>
            <p>This is another problem</p>
        </exproblem>
        <exsolution>
            <p>First solution</p>
        </exsolution>
        <exsolution>
            <p>Second solution</p>
            <p>Solutions can have multiple paragraphs</p>
        </exsolution>
        <excomment>
            <p>This problem has two solutions</p>
            <p>Commentaries can have multiple paragraphs as well</p>
        </excomment>
    </exercise>
</>

export const output = cnxml`
<exercise id="e1">
    <problem>
        <para>This is a problem</para>
        <para>It has multiple paragraphs</para>
    </problem>
    <commentary>
        <para>This exercise has no solutions</para>
    </commentary>
</exercise>
<exercise id="e2">
    <problem>
        <para>This is another problem</para>
    </problem>
    <solution>
        <para>First solution</para>
    </solution>
    <solution>
        <para>Second solution</para>
        <para>Solutions can have multiple paragraphs</para>
    </solution>
    <commentary>
        <para>This problem has two solutions</para>
        <para>Commentaries can have multiple paragraphs as well</para>
    </commentary>
</exercise>
`
