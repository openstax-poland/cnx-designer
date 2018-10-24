/** @jsx h */

export default change => change.insertAdmonition('tip')

export const input = <value>
    <document>
        <p><cursor/>Some note</p>
    </document>
</value>

export const output = <value>
    <document>
        <tip>
            <p><cursor/>Some note</p>
        </tip>
    </document>
</value>
