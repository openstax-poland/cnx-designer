/** @jsx h */

export default change => change.insertDefinition()

export const input = <value>
    <document>
        <p><cursor/>Definition</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Definition</p>
        <definition>
            <term><text><cursor/></text></term>
            <meaning>
                <p><text/></p>
            </meaning>
        </definition>
    </document>
</value>
