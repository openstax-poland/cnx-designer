/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <quote>
            <p>Some<anchor/> <focus/>quote</p>
        </quote>
    </document>
</value>

export const output = <value>
    <document>
        <quote>
            <p>Some</p>
        </quote>
        <p><cursor/>quote</p>
    </document>
</value>
