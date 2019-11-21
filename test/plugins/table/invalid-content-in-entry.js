/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p><text/></p>
        <table summary="">
            <ttgroup cols={2}>
                <ttbody>
                    <trow>
                        <tentry><p><cursor/></p></tentry>
                        <tentry>
                            <note>
                                <title>Title</title>
                                <p>Para in note</p>
                            </note>
                            <exercise>
                                <exproblem>
                                    <p>Para</p>
                                    <ul>
                                        <li><p>List</p></li>
                                    </ul>
                                </exproblem>
                                <exsolution>
                                    <quote>
                                        <title>Title</title>
                                        <p>Text</p>
                                    </quote>
                                </exsolution>
                            </exercise>
                        </tentry>
                    </trow>
                    <trow>
                        <tentry>
                            <preformat>
                                Some text
                            </preformat>
                            <code>
                                Code
                            </code>
                        </tentry>
                        <tentry/>
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
        <table summary="">
            <ttgroup cols={2}>
                <ttbody>
                    <trow>
                        <tentry><p><cursor/></p></tentry>
                        <tentry>
                            <p>Title</p>
                            <p>Para in note</p>
                            <p>Para</p>
                            <ul>
                                <li><p>List</p></li>
                            </ul>
                            <p>Title</p>
                            <p>Text</p>
                        </tentry>
                    </trow>
                    <trow>
                        <tentry>
                            <preformat>
                                Some text
                            </preformat>
                            <code>
                                Code
                            </code>
                        </tentry>
                        <tentry><p><text/></p></tentry>
                    </trow>
                </ttbody>
            </ttgroup>
            <tsummary><text/></tsummary>
        </table>
    </document>
</value>
