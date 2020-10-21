/** @jsx h */

export default editor => editor.wrapInline({ type: 'term' })

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
            <text/><term index="default">Term term<cursor/> term</term><text/>
        </p>
    </document>
</value>
