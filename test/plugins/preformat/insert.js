/** @jsx h */

export default editor => editor.insertBlock('preformat')

export const input = <value>
    <document>
        <p>Some<cursor/> preformat</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some</p>
        <preformat><cursor/></preformat>
        <p> preformat</p>
    </document>
</value>
