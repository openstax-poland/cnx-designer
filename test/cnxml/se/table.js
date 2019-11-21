/** @jsx h */

export const inputContent = <value>
    <document>
        <table
            id="report_card"
            summary="Summary"
            >
            <title>Report card</title>
            <ttgroup cols={3}>
                <tcolspec colnum="1" colname="c1"><text/></tcolspec>
                <tcolspec colnum="2" colname="c2"><text/></tcolspec>
                <tcolspec colnum="3" colname="c3"><text/></tcolspec>
                <tthead>
                    <trow>
                        <tentry><p>Course</p></tentry>
                        <tentry><p>Semester</p></tentry>
                        <tentry><p>Grade</p></tentry>
                    </trow>
                </tthead>
                <ttbody>
                    <trow>
                        <tentry morerows="1"><p>Biology</p></tentry>
                        <tentry><p>1</p></tentry>
                        <tentry><p>86%</p></tentry>
                    </trow>
                    <trow>
                        <tentry><p>2</p></tentry>
                        <tentry><p>91%</p></tentry>
                    </trow>
                    <trow>
                        <tentry morerows="1"><p>English</p></tentry>
                        <tentry><p>1</p></tentry>
                        <tentry><p>87%</p></tentry>
                    </trow>
                    <trow>
                        <tentry><p>2</p></tentry>
                        <tentry><p>78%</p></tentry>
                    </trow>
                </ttbody>
                <ttfoot>
                    <trow>
                        <tentry namest="c1" nameend="c2">
                            <p>Average:</p>
                        </tentry>
                        <tentry><p>85.5%</p></tentry>
                    </trow>
                </ttfoot>
            </ttgroup>
            <tsummary>Summary</tsummary>
        </table>
    </document>
</value>

export const output = cnxml`
<table id="report_card" summary="Summary">
    <title>Report card</title>
    <tgroup cols="3">
        <colspec colnum="1" colname="c1" />
        <colspec colnum="2" colname="c2" />
        <colspec colnum="3" colname="c3" />
        <thead>
            <row>
                <entry><para>Course</para></entry>
                <entry><para>Semester</para></entry>
                <entry><para>Grade</para></entry>
            </row>
        </thead>
        <tbody>
            <row>
                <entry morerows="1"><para>Biology</para></entry>
                <entry><para>1</para></entry>
                <entry><para>86%</para></entry>
            </row>
            <row>
                <entry><para>2</para></entry>
                <entry><para>91%</para></entry>
            </row>
            <row>
                <entry morerows="1"><para>English</para></entry>
                <entry><para>1</para></entry>
                <entry><para>87%</para></entry>
            </row>
            <row>
                <entry><para>2</para></entry>
                <entry><para>78%</para></entry>
            </row>
        </tbody>
        <tfoot>
            <row>
                <entry namest="c1" nameend="c2"><para>Average:</para></entry>
                <entry><para>85.5%</para></entry>
            </row>
        </tfoot>
    </tgroup>
</table>
`.replace(/s+|\\n/, '')
