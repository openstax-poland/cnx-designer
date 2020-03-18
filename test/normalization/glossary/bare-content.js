/** @jsx h */

export const input = <editor>
    <defterm><cursor/>Term</defterm>
    <defmeaning>
        <p>Meaning</p>
    </defmeaning>
    <defexample>
        <p>Example</p>
    </defexample>
    <defseealso>
        <defterm>Another term</defterm>
    </defseealso>
</editor>

export const output = <editor>
    <definition>
        <defterm><cursor/>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defexample>
            <p>Example</p>
        </defexample>
        <defseealso>
            <defterm>Another term</defterm>
        </defseealso>
    </definition>
</editor>
