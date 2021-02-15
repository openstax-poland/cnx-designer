/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <pi target="cnx.eoc" value='class="summary" title="Summary"'><text/></pi>
    <p>Content</p>
</>

export const output = cnxml`
<?cnx.eoc class="summary" title="Summary"?>
<para>Content</para>
`
