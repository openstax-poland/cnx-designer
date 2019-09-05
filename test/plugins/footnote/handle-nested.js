/** @jsx h */

export default editor => editor.insertInline('footnote')

export const input = <value>
    <document>
        <p>
            <text/><footnote>Footnote <cursor/> footnote</footnote><text/>
        </p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            <text/><footnote>Footnote <cursor/> footnote</footnote><text/>
        </p>
    </document>
</value>
