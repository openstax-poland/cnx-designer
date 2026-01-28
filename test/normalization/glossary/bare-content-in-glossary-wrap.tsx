/** @jsx h */

export const input = <editor>
    <p><text/></p>
    <glossary>
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
    <p><text/></p>
    <glossary>
        <definition>
            <defterm><text/></defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
        </definition>
        <definition>
            <defterm><text/></defterm>
            <defexample>
                <p>Example</p>
            </defexample>
        </definition>
        <definition>
            <defterm><text/></defterm>
            <defseealso>
                <defterm>Another term</defterm>
            </defseealso>
        </definition>
    </glossary>
</editor>
