/** @jsx h */

export default editor => editor.insertBlock('code')

export const input = <value>
    <document>
        <p>Some<cursor/> code</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some</p>
        <code><cursor/></code>
        <p> code</p>
    </document>
</value>
