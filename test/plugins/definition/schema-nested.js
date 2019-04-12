/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <definition>
            <term>Term</term>
            <meaning>
                <p>Before</p>
                <definition>
                    <term><text/></term>
                    <meaning>
                        <p>Problem</p>
                    </meaning>
                    <example>
                        <p>Solution</p>
                    </example>
                </definition>
                <p>After</p>
            </meaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term>Term</term>
            <meaning>
                <p>Before</p>
            </meaning>
            <meaning>
                <p>Problem</p>
            </meaning>
            <meaning>
                <p>Solution</p>
            </meaning>
            <meaning>
                <p>After</p>
            </meaning>
        </definition>
    </document>
</value>
