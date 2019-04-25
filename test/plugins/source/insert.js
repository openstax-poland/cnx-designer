/** @jsx h */

export default change => change.insertBlock('source_element')

export const input = <value>
    <document>
        <p>Some<cursor/> note</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some</p>
        <source>
            <text><cursor/></text>
        </source>
        <p> note</p>
    </document>
</value>
