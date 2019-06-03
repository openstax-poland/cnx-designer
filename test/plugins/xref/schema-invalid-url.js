/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p>Before <link url={12}>URL<cursor/></link> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before URL<cursor/> after</p>
    </document>
</value>
