/** @jsx h */

export default change => {
    change.normalize()
}

// See comment at the end of src/plugins/figure/schema.js
export const skip = true

export const input = <value>
    <document>
        <figure key="f1">
            <figure key="f2">
                <figure key="f3">
                    <media alt="First figure">
                        <img src="first.png"><text/></img>
                    </media>
                </figure>
                <figure key="f4">
                    <media alt="Second figure">
                        <img src="second.png"><text/></img>
                    </media>
                </figure>
            </figure>
            <figure key="f5">
                <media alt="Third figure">
                    <img src="third.png"><text/></img>
                </media>
            </figure>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure key="f1">
            <figure key="f3">
                <media alt="First figure">
                    <img src="first.png"><text/></img>
                </media>
            </figure>
            <figure key="f4">
                <media alt="Second figure">
                    <img src="second.png"><text/></img>
                </media>
            </figure>
            <figure key="f5">
                <media alt="Third figure">
                    <img src="third.png"><text/></img>
                </media>
            </figure>
        </figure>
    </document>
</value>
