/** @jsx h */

export default editor => editor.insertFigure({
    mime: 'audio/x-wav',
    name: 'audio.wav',
    alt: 'Audio alt',
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
            <media alt="Audio alt">
                <audio src="audio.wav" mime="audio/x-wav">
                    <text><cursor/></text>
                </audio>
                <mediaalt>Audio alt</mediaalt>
            </media>
        </figure>
    </document>
</value>
