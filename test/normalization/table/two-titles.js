/** @jsx h */

export const input = <editor>
    <table>
        <title>Table</title>
        <title><cursor/>More titles</title>
        <tgroup columns={[{ name: null }]}>
            <row>
                <cell><p>r1-c1</p></cell>
            </row>
        </tgroup>
    </table>
</editor>

export const output = <editor>
    <table>
        <title>Table<cursor/>More titles</title>
        <tgroup columns={[{ name: null }]}>
            <row>
                <cell><p>r1-c1</p></cell>
            </row>
        </tgroup>
    </table>
</editor>
