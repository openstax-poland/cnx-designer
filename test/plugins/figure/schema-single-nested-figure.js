/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <figure key="f1">
            <figure key="f2">
                <media alt="Figure">
                    <img src="figure.png"><text/></img>
                </media>
                <figcaption>Subfigure</figcaption>
            </figure>
            <figcaption key="caption">Main figure</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="Figure">
                <img src="figure.png"><text/></img>
            </media>
            <figcaption>SubfigureMain figure</figcaption>
        </figure>
    </document>
</value>
