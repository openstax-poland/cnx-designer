/** @jsx h */

import { List } from 'immutable'

export default editor => editor.normalize()

export const input = <value>
    <document>
        <note class={List(['class with spaces'])}>
            <p>Classes can&apos;t have spaces</p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <note class={List(['class', 'with', 'spaces'])}>
            <p>Classes can&apos;t have spaces</p>
        </note>
    </document>
</value>
