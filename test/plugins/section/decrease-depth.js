/** @jsx h */

export default change => change.decreaseSectionDepth()

export const input = <value>
    <document>
        <section>
            <title>Section</title>
            <p>First para</p>
            <section>
                <title>Nested</title>
                <p><cursor/>Second para</p>
            </section>
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
            <title>Nested</title>
            <p><cursor/>Second para</p>
        </section>
    </document>
</value>
