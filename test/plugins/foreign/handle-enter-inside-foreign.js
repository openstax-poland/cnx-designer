/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <p>Before <foreign>te<cursor/>xt</foreign> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <foreign>te</foreign><text/></p>
        <p><text/><foreign><cursor/>xt</foreign> after</p>
    </document>
</value>
