/** @jsx h */

export default editor => editor.addExampleToMeaning()

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning</p>
                <defexample>
                    <p>Example<cursor/></p>
                </defexample>
            </defmeaning>
            <defmeaning>
                <p>Meaning 2</p>
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
                <defexample>
                    <p><cursor/></p>
                </defexample>
            </defmeaning>
            <defmeaning>
                <p>Meaning 2</p>
            </defmeaning>
        </definition>
    </document>
</value>
