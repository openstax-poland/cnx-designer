/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <p>
            Before<cursor/>
            <foreign>
                Text
            </foreign>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            Before<cursor/>
            <foreign>
                ext
            </foreign>
            <text/>
        </p>
        <p>After</p>
    </document>
</value>
