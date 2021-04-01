/** @jsx h */

export const input = <editor>
    <p>Footnote:<footnote> footnote </footnote><text/></p>
    <p>Foreign:<foreign> foreign </foreign><text/></p>
    <p>Link:<link url="test"> link </link><text/></p>
    <p>Term:<term> term </term><text/></p>
    <p>Cursor:<term> cursor<cursor/> </term><text/></p>
</editor>

export const output = <editor>
    <p>Footnote: <footnote>footnote</footnote> </p>
    <p>Foreign: <foreign>foreign</foreign> </p>
    <p>Link: <link url="test">link</link> </p>
    <p>Term: <term>term</term> </p>
    <p>Cursor:<term> cursor<cursor/> </term><text/></p>
</editor>
