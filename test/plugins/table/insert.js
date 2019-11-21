/** @jsx h */

export default editor => editor.insertTable({
    cols: 2,
    rows: 2,
})

export const input = <value>
    <document>
        <p><cursor/></p>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <ttgroup cols={2}>
                <ttbody>
                    <trow>
                        <tentry><p><cursor/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                </ttbody>
            </ttgroup>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>
