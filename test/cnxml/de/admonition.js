/** @jsx h */

import { List } from 'immutable'

export const input = cnxml`
<note id="n1">
    <para>Notes' default type is ‘note’.</para>
</note>
<note id="n2" type="warning">
    <title>This is a title</title>
    <para>And this is a paragraph</para>
</note>
<note id="n3" type="tip">Notes can also have text content.</note>
`

export const outputContent = <value>
    <document>
        <note key="n1" type="note" class={List()}>
            <p>Notes' default type is ‘note’.</p>
        </note>
        <note key="n2" type="warning" class={List()}>
            <title>This is a title</title>
            <p>And this is a paragraph</p>
        </note>
        <note key="n3" type="tip" class={List()}>
            <p>Notes can also have text content.</p>
        </note>
    </document>
</value>
