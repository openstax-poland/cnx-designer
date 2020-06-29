/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<para>
     \t
  A\u2060 paragraph \u3000  with
   <emphasis>  excessive
      \t       </emphasis>
 white<link url="test">  \xa0   space   </link>
     \x20
</para>

<note><para>   excessive   white  space </para></note>

<note>
  excessive     white  space
</note>

<figure>
    <media alt="   Alt ">
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

export const output = <document>
    <p>A paragraph{"\u3000"}with <b>excessive</b> white{"\xa0"}<link url="test">space</link><text/></p>
    <note>
        <p>excessive white space</p>
    </note>
    <note>
        <p>excessive white space</p>
    </note>
    <figure>
        <media>
            <img src="example.png" intendedUse="all"><text/></img>
            <mediaalt>Alt</mediaalt>
        </media>
        <caption>excessive white space</caption>
    </figure>
    <code>{"\n    This white space\n        should not be normalized\n"}</code>
</document>
