/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defexample>
            <p>Example<cursor/></p>
        </defexample>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defexample>
            <p>Example</p>
        </defexample>
        <defmeaning>
            <p><cursor/></p>
        </defmeaning>
    </definition>
</editor>
