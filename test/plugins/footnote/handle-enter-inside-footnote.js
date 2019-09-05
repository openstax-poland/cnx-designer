/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <p>Before <footnote>foot<cursor/>note</footnote> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <footnote>foot</footnote><text/></p>
        <p><text/><footnote><cursor/>note</footnote> after</p>
    </document>
</value>
