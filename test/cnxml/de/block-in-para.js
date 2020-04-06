/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<para>Some text<list id="l1">
        <item>List item</item>
    </list>More text<figure id="f1">
        <media alt="This should not be inline">
            <image src="f1.png" mime-type="image/png" />
        </media>
    </figure>Even more text</para>
`

export const output = <document>
    <p>Some text</p>
    <itemlist id="l1">
        <li>
            <p>List item</p>
        </li>
    </itemlist>
    <p>More text</p>
    <figure id="f1">
        <media>
            <img src="f1.png" intendedUse="all"><text/></img>
            <mediaalt>This should not be inline</mediaalt>
        </media>
    </figure>
    <p>Even more text</p>
</document>

export const errors = [
    ['unexpected-element', { namespace: 'http://cnx.rice.edu/cnxml', localName: 'list', id: 'l1' }],
    ['unexpected-element', { namespace: 'http://cnx.rice.edu/cnxml', localName: 'figure', id: 'f1' }],
]
