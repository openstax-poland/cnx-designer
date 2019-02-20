/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <section>
            <title>Section</title>
            <p>In section</p>
        </section>
        <p>After section</p>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>Section</title>
            <p>In section</p>
            <p>After section</p>
        </section>
    </document>
</value>
