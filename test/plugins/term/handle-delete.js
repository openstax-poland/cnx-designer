/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <p>
            Before<cursor/>
            <term>
                Term
            </term>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            Before<cursor/>
            <term index="default">
                erm
            </term>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>
