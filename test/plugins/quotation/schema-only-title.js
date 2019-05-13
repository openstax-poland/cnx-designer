/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <quote>
            <title>First title</title>
        </quote>
    </document>
</value>

export const output = <value>
    <document>
        <quote>
            <title>First title</title>
            <p><text/></p>
        </quote>
    </document>
</value>
