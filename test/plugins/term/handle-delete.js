/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Delete' })
}

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
            <term>
                erm
            </term>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>
