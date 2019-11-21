/** @jsx h */

export const input = cnxml`
<table id="report_card" summary="Summary" frame="top" colsep="1" rowsep="0">
    <title>Report card</title>
    <tgroup cols="3" colsep="1" rowsep="1" align="center" char="." charoff="50">
        <colspec colnum="1" colname="c1" />
        <colspec colnum="2" colname="c2" />
        <colspec colnum="3" colname="c3" />
        <thead>
            <row>
                <entry
                  colsep="1"
                  rowsep="0"
                  align="left"
                  valign="middle"
                  >Course</entry>
                <entry char="." charoff="20">Semester</entry>
                <entry>Grade</entry>
            </row>
        </thead>
        <tfoot>
            <row>
                <entry namest="c1" nameend="c2">Average:</entry>
                <entry>85.5%</entry>
            </row>
        </tfoot>
        <tbody>
            <row>
                <entry morerows="1">Biology</entry>
                <entry>1</entry>
                <entry>86%</entry>
            </row>
            <row>
                <entry>2</entry>
                <entry>91%</entry>
            </row>
            <row>
                <entry morerows="1">English</entry>
                <entry>1</entry>
                <entry>87%</entry>
            </row>
            <row>
                <entry>2</entry>
                <entry>78%</entry>
            </row>
        </tbody>
    </tgroup>
</table>
`

export const outputContent = <value>
    <document>
        <table
            id="report_card"
            summary="Summary"
            frame="top"
            colsep={1}
            rowsep={0}
            >
            <title>Report card</title>
            <ttgroup
                cols={3}
                colsep={1}
                rowsep={1}
                align="center"
                char="."
                charoff={50}
                >
                <tcolspec colnum={1} colname="c1"><text/></tcolspec>
                <tcolspec colnum={2} colname="c2"><text/></tcolspec>
                <tcolspec colnum={3} colname="c3"><text/></tcolspec>
                <tthead>
                    <trow>
                        <tentry
                            colsep={1}
                            rowsep={0}
                            align="left"
                            valign="middle"
                            >
                            <p>Course</p>
                        </tentry>
                        <tentry
                            char="."
                            charoff={20}
                            >
                            <p>Semester</p>
                        </tentry>
                        <tentry><p>Grade</p></tentry>
                    </trow>
                </tthead>
                <ttbody>
                    <trow>
                        <tentry morerows={1}><p>Biology</p></tentry>
                        <tentry><p>1</p></tentry>
                        <tentry><p>86%</p></tentry>
                    </trow>
                    <trow>
                        <tentry><p>2</p></tentry>
                        <tentry><p>91%</p></tentry>
                    </trow>
                    <trow>
                        <tentry morerows={1}><p>English</p></tentry>
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
