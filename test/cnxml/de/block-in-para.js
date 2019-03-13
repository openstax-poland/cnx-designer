/** @jsx h */

export const input = cnxml`
<para id="p1">Some text<list id="l1">
        <item>List item</item>
    </list>More text<figure id="f1">
        <media alt="This should not be inline">
            <image src="f1.png" />
        </media>
    </figure>Even more text</para>
`

export const output = <value>
    <document>
        <p key="p1">Some text</p>
        <ul key="l1">
            <li>
                <p>List item</p>
            </li>
        </ul>
        <p>More text</p>
        <figure key="f1">
            <media alt="This should not be inline">
                <img src="f1.png"><text/></img>
            </media>
        </figure>
        <p>Even more text</p>
    </document>
</value>
