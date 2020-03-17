/** @jsx h */

export const input = <editor>
    <p>Code: <codeline><text/></codeline></p>
    <p>Footnote: <footnote><text/></footnote></p>
    <p>Foreign: <foreign><text/></foreign></p>
    <p>Link: <link url="test"><text/></link></p>
    <p>Term: <term><text/></term></p>
    <p>Cursor: <term><cursor/></term></p>
</editor>

export const output = <editor>
    <p>Code: </p>
    <p>Footnote: </p>
    <p>Foreign: </p>
    <p>Link: </p>
    <p>Term: </p>
    <p>Cursor: <term><cursor/></term><text/></p>
</editor>
