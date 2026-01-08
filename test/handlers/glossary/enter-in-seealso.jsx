/** @jsx h */

export default input => input.break()

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defseealso>
            <defterm>Term<cursor/></defterm>
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
            <defterm>Term</defterm>
            <defterm><cursor/></defterm>
        </defseealso>
    </definition>
</editor>
