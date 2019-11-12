/** @jsx h */

/* eslint-disable max-len */

import { List } from 'immutable'

export const input = cnxml`
<para>
     \t
  A\u2060 paragraph \u3000  with
   <emphasis>  excessive
      \t       </emphasis>
 white<link url="test">  \xa0   space   </link>
     \x20
</para>

<note><p>   excessive   white  space </p></note>

<note>
  excessive     white  space
</note>

<figure>
    <media alt="Alt">
        <image src="example.png" mime-type="image/png" />
    </media>
    <caption>
        excessive      white  space
    </caption>
</figure>

<code display="block">
    This white space
        should not be normalized
</code>
`

export const outputContent = <value>
    <document>
        <p>A paragraph{"\u3000"}with <b>excessive</b> white{"\xa0"}<link url="test">space</link><text/></p>
        <note class={List()}>
            <p>excessive white space</p>
        </note>
        <note class={List()}>
            <p>excessive white space</p>
        </note>
        <figure class={List()}>
            <media alt="Alt">
                <img src="example.png" mime="image/png"><text/></img>
                <mediaalt>Alt</mediaalt>
            </media>
            <figcaption>excessive white space</figcaption>
        </figure>
        <code>{"\n    This white space\n        should not be normalized\n"}</code>
    </document>
</value>
