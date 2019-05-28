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
                <defexample>
                    <p><cursor/>Example</p>
                </defexample>
            </defmeaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning<cursor/>Example</p>
            </defmeaning>
        </definition>
    </document>
</value>
