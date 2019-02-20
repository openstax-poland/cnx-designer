/** @jsx h */

export default change => change.insertSection()

export const input = <value>
    <document>
        <section>
            <title>Section</title>
            <p>First para</p>
            <p><cursor/>Second para</p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>Section</title>
            <p>First para</p>
        </section>
        <section>
            <title><cursor/></title>
            <p>Second para</p>
        </section>
    </document>
</value>
