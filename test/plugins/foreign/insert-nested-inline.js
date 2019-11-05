/** @jsx h */

export default editor => editor.wrapInline({ type: 'term' })

// There is probably a bug in slate which causes selection to
// be moved at the end for term.
export const checkSelection = false

export const input = <value>
    <document>
        <p>
            <text/>
            <foreign>Foreign <anchor/>term<focus/> text</foreign>
            <text/>
        </p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            <text/>
            <foreign>Foreign <term><anchor/>term</term><focus/> text</foreign>
            <text/>
        </p>
    </document>
</value>
