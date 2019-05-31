/** @jsx h */

export default editor => editor.wrapInline({ type: 'term' })

export const input = <value>
    <document>
        <p>Before <anchor/>term<focus/> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <term><anchor/>term</term><focus/> after</p>
    </document>
</value>
