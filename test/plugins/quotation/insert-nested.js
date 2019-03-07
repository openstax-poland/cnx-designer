/** @jsx h */

export default change => change.wrapBlock('quotation')

export const input = <value>
    <document>
        <quote>
            <p>First paragraph</p>
            <p><cursor/>Second paragraph</p>
            <p>Third paragraph</p>
        </quote>
    </document>
</value>

export const output = <value>
    <document>
        <quote>
            <p>First paragraph</p>
            <quote>
                <p><cursor/>Second paragraph</p>
            </quote>
            <p>Third paragraph</p>
        </quote>
    </document>
</value>
