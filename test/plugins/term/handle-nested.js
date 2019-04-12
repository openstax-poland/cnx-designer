/** @jsx h */

export default change => change.wrapInline({ type: 'term' })

export const input = <value>
    <document>
        <p>
            <text/><term>Term <anchor/>term<focus/> term</term><text/>
        </p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            <text/><term>Term term<cursor/> term</term><text/>
        </p>
    </document>
</value>
