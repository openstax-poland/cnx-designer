/** @jsx h */

import { List } from 'immutable'

export default editor => {
    editor.changeListType('ul_list')
    editor.moveToStartOfNode(editor.value.document.getNode('second'))
    editor.changeListType('ol_list')
}

export const checkSelection = false

export const input = <value>
    <document>
        <ol
            bulletStyle="a"
            class={List(['a', 'b'])}
            markPrefix="1"
            markSuffix="*"
            itemSep=""
            numberStyle="1"
            startValue="1"
            type="a"
            >
            <li>
                <p><cursor/>List</p>
            </li>
        </ol>
        <p key="second">Para</p>
    </document>
</value>

export const output = <value>
    <document>
        <ul
            class={List(['a', 'b'])}
            markPrefix="1"
            markSuffix="*"
            itemSep=""
            type="a"
            >
            <li>
                <p>List</p>
            </li>
        </ul>
        <ol>
            <li>
                <p key="second">Para</p>
            </li>
        </ol>
    </document>
</value>
