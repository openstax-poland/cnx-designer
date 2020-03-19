/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
            <defexample>
                <p><cursor/>Example</p>
            </defexample>
        </defmeaning>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning<cursor/>Example</p>
        </defmeaning>
    </definition>
</editor>
