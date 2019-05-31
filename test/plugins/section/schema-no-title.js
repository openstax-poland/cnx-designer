/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <section>
            <p key="p1">In section</p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <p key="p1">In section</p>
    </document>
</value>
