/** @jsx h */

export default editor => editor.removeTableCaption()

export const input = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <ttgroup cols={2}>
                <ttbody>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                </ttbody>
            </ttgroup>
            <tcaption><cursor/></tcaption>
            <tsummary><text/></tsummary>
        </table>
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
            <tsummary><cursor/></tsummary>
        </table>
    </document>
</value>
