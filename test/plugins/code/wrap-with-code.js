/** @jsx h */

export default editor => editor.wrapInline('code')

export const input = <value>
    <document>
        <p>Some <anchor/>code<focus/></p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some <codeinline><anchor/>code</codeinline><focus/></p>
    </document>
</value>
