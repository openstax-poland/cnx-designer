/** @jsx h */

export default change => change.insertSeeAlso()

export const input = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <seealso>
                <term>See<cursor/>also</term>
            </seealso>
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
                <term>See<cursor/>also</term>
            </seealso>
        </definition>
    </document>
</value>
