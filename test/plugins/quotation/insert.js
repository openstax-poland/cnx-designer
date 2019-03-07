/** @jsx h */

export default change => change.wrapBlock('quotation')

export const input = <value>
    <document>
        <p><cursor/>Some note</p>
    </document>
</value>

export const output = <value>
    <document>
        <quote>
            <p><cursor/>Some note</p>
        </quote>
    </document>
</value>
