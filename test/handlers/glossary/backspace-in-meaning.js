/** @jsx h */

export default input => input.backspace()

export const skip = true

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p><cursor/>Meaning</p>
        </defmeaning>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term<cursor/>Meaning</defterm>
        <defmeaning>
            <p><text/></p>
        </defmeaning>
    </definition>
</editor>
