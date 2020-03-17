/** @jsx h */

export const input = <editor>
    <quote>
        <title>First title</title>
        <title><cursor/>Second title</title>
        <p>Content</p>
    </quote>
</editor>

export const output = <editor>
    <quote>
        <title>First title</title>
        <p><cursor/>Second title</p>
        <p>Content</p>
    </quote>
</editor>
