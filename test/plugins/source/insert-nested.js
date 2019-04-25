/** @jsx h */

export default change => change.insertBlock('source_element')

export const input = <value>
    <document>
        <source>
            So<cursor/>urce
        </source>
    </document>
</value>

export const output = <value>
    <document>
        <source>
            So
        </source>
        <source>
            <cursor/>
        </source>
        <source>
            urce
        </source>
    </document>
</value>
