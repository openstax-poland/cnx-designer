/** @jsx h */

export default (change, editor) => {
    editor.event('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.event('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Pro<cursor/>blem</p>
            </exproblem>
        </exercise>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Pro</p>
                <p><text/></p>
                <p><cursor/>blem</p>
            </exproblem>
        </exercise>
    </document>
</value>
