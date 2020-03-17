/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <note>
        <p>Admonition without classes</p>
    </note>
    <note classes={['class']}>
        <p>Admonition with classes</p>
    </note>
</editor>

export const output = input
