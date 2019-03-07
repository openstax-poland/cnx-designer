/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <quote key="q1">
            <p key="p1">First paragraph</p>
            <note key="n1">
                <p><cursor/>Second paragraph</p>
            </note>
            <p key="p3">Third paragraph</p>
        </quote>
    </document>
</value>

export const output = <value>
    <document>
        <quote key="q1">
            <p key="p1">First paragraph</p>
        </quote>
        <note key="n1">
            <p><cursor/>Second paragraph</p>
        </note>
        <quote>
            <p key="p3">Third paragraph</p>
        </quote>
    </document>
</value>
