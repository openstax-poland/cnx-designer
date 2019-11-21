/** @jsx h */

export default editor => editor.normalize()

// TODO: Normalize selection
export const checkSelection = false

export const input = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <tcaption>Caption</tcaption>
            <ttgroup cols={2}>
                <ttfoot>
                    <trow>
                        <tentry><text/></tentry>
                        <tentry><text/></tentry>
                    </trow>
                </ttfoot>
                <ttbody>
                    <trow>
                        <tentry><cursor/></tentry>
                        <tentry><text/></tentry>
                    </trow>
                    <trow>
                        <tentry><text/></tentry>
                        <tentry><text/></tentry>
                    </trow>
                </ttbody>
                <tthead>
                    <trow>
                        <tentry><text/></tentry>
                        <tentry><text/></tentry>
                    </trow>
                </tthead>
            </ttgroup>
            <title>Title</title>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>


export const output = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <title>Title</title>
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
            <tcaption>Caption</tcaption>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>
