/** @jsx h */

export default change => change.addSeeAlsoToDefinition()

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning<cursor/></p>
            </defmeaning>
            <defseealso>
                <defterm>Term<cursor/></defterm>
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
                <defterm>Term</defterm>
                <defterm><cursor/></defterm>
            </defseealso>
        </definition>
    </document>
</value>
