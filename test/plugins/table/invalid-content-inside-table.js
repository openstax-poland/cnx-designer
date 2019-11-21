/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <note>
                <p>Note in random position</p>
            </note>
            <ttgroup cols={2}>
                <ttbody>
                    <quote>
                        <p>Quote in random position</p>
                    </quote>
                    <trow>
                        <tentry><p><cursor/></p></tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                    <p>
                        Para in random position
                    </p>
                    <trow>
                        <tentry><p><text/></p></tentry>
                        <tentry><p><text/></p></tentry>
                        <preformat>
                            Preformat in random position
                        </preformat>
                    </trow>
                </ttbody>
            </ttgroup>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/></p>
        <note>
            <p>Note in random position</p>
        </note>
        <quote>
            <p>Quote in random position</p>
        </quote>
        <p>
            Para in random position
        </p>
        <preformat>
            Preformat in random position
        </preformat>
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
