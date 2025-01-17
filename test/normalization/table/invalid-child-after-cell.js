/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <table>
        <tgroup columns={[{ name: null }, { name: null }]}>
            <row>
                <cell><p>r1-c1</p></cell>
                <p>Invalid child</p>
                <cell><p>r1-c2</p></cell>
            </row>
        </tgroup>
    </table>
</editor>

export const output = <editor>
    <table>
        <tgroup columns={[{ name: null }, { name: null }]}>
            <row>
                <cell>
                    <p>r1-c1</p>
                    <p>Invalid child</p>
                </cell>
                <cell><p>r1-c2</p></cell>
            </row>
        </tgroup>
    </table>
</editor>
