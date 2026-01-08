/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <quote>
        <quote>
            <p>Content</p>
        </quote>
    </quote>
    <quote>
        <quote>
            <p>First quote</p>
        </quote>
        <quote>
            <p>Second quote</p>
        </quote>
    </quote>
</editor>

export const output = <editor>
    <quote>
        <p>Content</p>
    </quote>
    <quote>
        <quote>
            <p>First quote</p>
        </quote>
        <quote>
            <p>Second quote</p>
        </quote>
    </quote>
</editor>
