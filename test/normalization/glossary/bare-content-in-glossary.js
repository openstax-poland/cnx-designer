/** @jsx h */

export const input = <editor>
    <p>Document</p>
    <glossary>
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
    </glossary>
</editor>

export const output = <editor>
    <p>Document</p>
    <glossary>
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
    </glossary>
</editor>
