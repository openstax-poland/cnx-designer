/** @jsx h */

export default change => change.insertDefinition('before')

export const input = <value>
    <document>
        <definition>
            <defterm>Term<cursor/></defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm><cursor/></defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
    </document>
</value>
