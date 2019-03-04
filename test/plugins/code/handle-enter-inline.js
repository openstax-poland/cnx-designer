/** @jsx h */

export default (change, editor) => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <p><codeinline>Some <cursor/>code</codeinline></p>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/><codeinline>Some </codeinline><text/></p>
        <p><text/><codeinline><cursor/>code</codeinline><text/></p>
    </document>
</value>
