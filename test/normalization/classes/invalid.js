/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <note classes={['class with spaces']}>
        <p>Classes can&apos;t have spaces</p>
    </note>
</editor>

export const output = <editor>
    <note classes={['class', 'spaces', 'with']}>
        <p>Classes can&apos;t have spaces</p>
    </note>
</editor>
