/** @jsx h */

export const input = <editor>
    <definition>
        <p>Before</p>
        <defterm>Term</defterm>
        <p><cursor/>Bad content</p>
        <defseealso>
            <defterm>Another term</defterm>
        </defseealso>
        <p>After</p>
    </definition>
    <definition>
        <defterm>Another term</defterm>
        <p>bad</p>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <p>content</p>
    </definition>
</editor>

export const output = <editor>
    <p>Before</p>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p><cursor/>Bad content</p>
        </defmeaning>
        <defseealso>
            <defterm>Another term</defterm>
        </defseealso>
    </definition>
    <p>After</p>
    <definition>
        <defterm>Another term</defterm>
        <defmeaning>
            <p>bad</p>
            <p>Meaning</p>
            <p>content</p>
        </defmeaning>
    </definition>
</editor>
