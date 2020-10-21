/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <p>Before <term>te<cursor/>rm</term> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <term index="default">te</term><text/></p>
        <p><text/><term index="default"><cursor/>rm</term> after</p>
    </document>
</value>
