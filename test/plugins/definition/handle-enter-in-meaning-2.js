/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Enter' })
  editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning<cursor/></p>
                <defexample>
                    <p>Example</p>
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
                <p>Meaning</p>
                <defexample>
                    <p>Example</p>
                </defexample>
            </defmeaning>
            <defmeaning>
                <p><cursor/></p>
            </defmeaning>
        </definition>
    </document>
</value>
