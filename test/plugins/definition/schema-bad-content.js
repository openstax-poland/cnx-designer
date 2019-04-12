/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <definition><cursor/>Bare text</definition>
        <definition>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <p>First bad child</p>
            <example>
                <p>Example</p>
            </example>
            <p>Second bad child</p>
            <seealso>
                <p>Bad term</p>
            </seealso>
            <p>Third bad child</p>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p><cursor/></p>
            </meaning>
        </definition>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <meaning>
                <p>First bad child</p>
            </meaning>
            <example>
                <p>Example</p>
            </example>
            <meaning>
                <p>Second bad child</p>
            </meaning>
            <seealso>
                <term>Bad term</term>
                <term>Third bad child</term>
            </seealso>
        </definition>
    </document>
</value>
