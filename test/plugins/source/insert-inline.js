/** @jsx h */

export default change => change.insertInline('source_element')

export const input = <value>
    <document>
        <p>Some<cursor/> note</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some
            <sourceinline>
                <cursor/>
            </sourceinline>
        {' '}note
        </p>
    </document>
</value>
