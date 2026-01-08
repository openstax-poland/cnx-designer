/** @jsx h */

export default input => input.backspace()

export const skip = true

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p><text/></p>
        </defmeaning>
    </definition>
    <definition>
        <defterm><cursor/>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p><text/><term><cursor/>Term</term><text/></p>
        </defmeaning>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
    </definition>
</editor>
