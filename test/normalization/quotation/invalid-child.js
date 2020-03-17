/** @jsx h */

export const skip = true

export const input = <editor>
    <quote key="q1">
        <p key="p1">First paragraph</p>
        <note key="n1">
            <p><cursor/>Second paragraph</p>
        </note>
        <p key="p3">Third paragraph</p>
    </quote>
</editor>

export const output = <editor>
    <quote key="q1">
        <p key="p1">First paragraph</p>
    </quote>
    <note key="n1">
        <p><cursor/>Second paragraph</p>
    </note>
    <quote>
        <p key="p3">Third paragraph</p>
    </quote>
</editor>
