/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <figure>
            <media alt="alt">
                <img src="first.png" mime="image/png"><text/></img>
                <img src="second.png" mime="image/png"><text/></img>
            </media>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="alt">
                <img src="first.png" mime="image/png"><text/></img>
                <img src="second.png" mime="image/png"><text/></img>
                <mediaalt>alt</mediaalt>
            </media>
        </figure>
    </document>
</value>
