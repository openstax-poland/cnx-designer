/** @jsx h */

export default (change, editor) =>  {
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <p>Before <term>te<cursor/>rm</term> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <term>te</term><text/></p>
        <p><text/><term><cursor/>rm</term> after</p>
    </document>
</value>
