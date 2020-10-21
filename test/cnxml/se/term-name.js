/** @jsx h */

export const inputContent = <value>
    <document>
        <p><text/><term index="name" name="Smith, John" born={2000}>John Smith</term><text/></p>
        <p><text/><term index="name" name="Smith, John" born={2000} died={2020}>John Smith</term><text/></p>
    </document>
</value>

export const output = cnxml`
<para><term cxlxt:index="name" cxlxt:name="Smith, John" cxlxt:born="2000">John Smith</term></para>
<para><term cxlxt:index="name" cxlxt:name="Smith, John" cxlxt:born="2000" cxlxt:died="2020">John Smith</term></para>
`
