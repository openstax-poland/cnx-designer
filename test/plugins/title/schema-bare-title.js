/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <title key="t1">Test</title>
    </document>
</value>

export const output = <value>
    <document>
        <p key="t1">Test</p>
    </document>
</value>
