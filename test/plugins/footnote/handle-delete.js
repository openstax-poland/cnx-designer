/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <p>
            Before<cursor/>
            <footnote>
                Footnote
            </footnote>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            Before<cursor/>
            <footnote>
                ootnote
            </footnote>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>
