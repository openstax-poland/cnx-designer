/** @jsx h */

export default change => change.insertDefinition('after')

export const input = <value>
    <document>
        <p>1</p>
        <p><cursor/>2</p>
        <p>3</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>1</p>
        <p>2</p>
        <definition>
            <term><text><cursor/></text></term>
            <meaning>
                <p><text/></p>
            </meaning>
        </definition>
        <p>3</p>
    </document>
</value>
