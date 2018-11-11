/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <note>
            <p><cursor/>Note</p>
        </note>
    </document>
</value>


export const output = <value>
    <document>
        <note>
            <p><text/></p>
            <p><cursor/>Note</p>
        </note>
    </document>
</value>
