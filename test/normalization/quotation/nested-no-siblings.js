/** @jsx h */

export const input = <editor>
    <quote>
        <quote>
            <p><cursor/>Content</p>
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
        <p><cursor/>Content</p>
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
