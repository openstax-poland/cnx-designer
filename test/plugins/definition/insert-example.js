/** @jsx h */

export default change => change.addExampleToMeaning()

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning<cursor/></p>
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
                    <p><cursor/></p>
                </defexample>
            </defmeaning>
            <defmeaning>
                <p>Meaning 2</p>
            </defmeaning>
        </definition>
    </document>
</value>
