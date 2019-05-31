/** @jsx h */

export default editor => editor.addSeeAlsoToDefinition()

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p>Meaning<cursor/></p>
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
            </defmeaning>
            <defseealso>
                <defterm><cursor/></defterm>
            </defseealso>
        </definition>
    </document>
</value>
