/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
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
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
            <defseealso>
                <defterm>Te<cursor/>T</defterm>
            </defseealso>
        </definition>
    </document>
</value>
