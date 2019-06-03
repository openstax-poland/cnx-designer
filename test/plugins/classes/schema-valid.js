/** @jsx h */

import { List } from 'immutable'

export default editor => editor.normalize()

export const input = <value>
    <document>
        <note>
            <p>Admonition without classes</p>
        </note>
        <note class={List(['class'])}>
            <p>Admonition with classes</p>
        </note>
    </document>
</value>

export const output = input
