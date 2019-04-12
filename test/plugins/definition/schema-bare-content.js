/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <term>Term</term>
        <meaning>
            <p>Meaning</p>
        </meaning>
        <example>
            <p>example</p>
        </example>
        <seealso>
            <term>See Also</term>
        </seealso>
    </document>
</value>

export const output = <value>
    <document>
        <p>Term</p>
        <p>Meaning</p>
        <p>example</p>
        <p>See Also</p>
    </document>
</value>
