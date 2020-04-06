/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<exercise id="e1">
    <problem>
        <para>This is a problem</para>
    </problem>
    <solution>
        <para>This is a solution</para>
    </solution>
    <solution>
        <para>This is another solution</para>
    </solution>
    <commentary>
        <para>This is a commentary</para>
    </commentary>
</exercise>
`

export const output = <document>
    <exercise id="e1">
        <exproblem>
            <p>This is a problem</p>
        </exproblem>
        <exsolution>
            <p>This is a solution</p>
        </exsolution>
        <exsolution>
            <p>This is another solution</p>
        </exsolution>
        <excomment>
            <p>This is a commentary</p>
        </excomment>
    </exercise>
</document>
