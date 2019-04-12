/** @jsx h */

export default change => change.insertExample()

export const input = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p><cursor/>Meaning</p>
            </meaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <example>
                <p><text><cursor/></text></p>
            </example>
        </definition>
    </document>
</value>
