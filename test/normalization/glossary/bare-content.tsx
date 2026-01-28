/** @jsx h */

export const input = <editor>
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
    <p>Meaning</p>
    <p>Example</p>
    <p><text/><term>Another term</term><text/></p>
</editor>
