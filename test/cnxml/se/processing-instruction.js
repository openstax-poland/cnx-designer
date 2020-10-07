/** @jsx h */

export const inputContent = <value>
    <document>
        <pi target="cnx.eoc" value='class="summary" title="Summary"'><text/></pi>
        <p>Content</p>
    </document>
</value>

export const output = cnxml`
<?cnx.eoc class="summary" title="Summary"?>
<para>Content</para>
`
