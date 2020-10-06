/** @jsx h */

export const input = cnxml`
<?cnx.eoc class="summary" title="Summary"?>
<para>Content</para>
`

export const outputContent = <value>
    <document>
        <pi target="cnx.eoc" value='class="summary" title="Summary"'><text/></pi>
        <p>Content</p>
    </document>
</value>
