/** @jsx h */

export default (change, editor) => {
  editor.event('onKeyDown', { key: 'Delete' })
}

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem<cursor/></p>
            </exproblem>
            <exsolution>
                <p>Solution</p>
            </exsolution>
        </exercise>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem<cursor/>Solution</p>
            </exproblem>
        </exercise>
    </document>
</value>