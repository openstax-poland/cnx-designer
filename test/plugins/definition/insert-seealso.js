/** @jsx h */

export default change => change.insertSeeAlso()

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
            <seealso>
                <term><text><cursor/></text></term>
            </seealso>
        </definition>
    </document>
</value>
