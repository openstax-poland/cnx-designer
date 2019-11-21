/** @jsx h */

export default editor => {
    editor.removeTfoot()
}

export const input = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <ttgroup cols={2}>
                <tthead>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                </tthead>
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
                <ttfoot>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                </ttfoot>
            </ttgroup>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <ttgroup cols={2}>
                <tthead>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                </tthead>
                <ttbody>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><cursor/></p></tentry>
                    </trow>
                </ttbody>
            </ttgroup>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>
