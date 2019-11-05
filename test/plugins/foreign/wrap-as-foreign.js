/** @jsx h */

export default editor => editor.wrapInline({ type: 'foreign' })

export const input = <value>
    <document>
        <p>Before <anchor/>foreign<focus/> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <foreign><anchor/>foreign</foreign><focus/> after</p>
    </document>
</value>
