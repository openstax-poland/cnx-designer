/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
            <defseealso>
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
                <p>Meaning<cursor/>T</p>
            </defmeaning>
        </definition>
    </document>
</value>
