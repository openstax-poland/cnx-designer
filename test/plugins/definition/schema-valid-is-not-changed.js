/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p><cursor/>Meaning</p>
                <defexample>
                    <p>Example</p>
                </defexample>
            </defmeaning>
            <defseealso>
                <defterm>Term</defterm>
            </defseealso>
        </definition>
    </document>
</value>

export const output = input
