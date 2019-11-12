/** @jsx h */

export default editor => editor.insertFigure({
    mime: 'video/mpeg',
    name: 'video.mpg',
    alt: 'Video alt',
})

export const input = <value>
    <document>
        <p><text><cursor/></text></p>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/></p>
        <figure>
            <media alt="Video alt">
                <video src="video.mpg" mime="video/mpeg">
                    <text><cursor/></text>
                </video>
                <mediaalt>Video alt</mediaalt>
            </media>
        </figure>
    </document>
</value>
