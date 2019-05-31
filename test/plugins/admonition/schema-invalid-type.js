/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <block type="admonition" data={{ type: 'invalid' }}>
            <p>Text</p>
        </block>
    </document>
</value>

export const output = <value>
    <document>
        <p>Text</p>
    </document>
</value>
