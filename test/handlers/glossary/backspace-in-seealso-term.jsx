/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defseealso>
            <defterm>Te</defterm>
            <defterm><cursor/>T</defterm>
        </defseealso>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defseealso>
            <defterm>Te<cursor/>T</defterm>
        </defseealso>
    </definition>
</editor>
