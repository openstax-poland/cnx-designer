/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<?cnx.eoc class="summary" title="Summary"?>
<para>Content</para>
`

export const output = <document>
    <pi target="cnx.eoc" value='class="summary" title="Summary"'><text/></pi>
    <p>Content</p>
</document>
