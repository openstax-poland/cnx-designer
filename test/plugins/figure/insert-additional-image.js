/** @jsx h */

export default editor => {
    editor.insertBlock({
        type: 'image',
        data: {
            mime: 'image/jpeg',
            src: 'second.jpg',
            for: 'pdf',
        },
    })

    const first = editor.value.document.getNode('first')
    editor.setNodeByKey(first.key, { data: first.data.set('for', 'online') })
}

export const input = <value>
    <document>
        <p><text/></p>
        <figure>
            <media alt="Two images">
                <img key="first" src="first.png" mime="image/png">
                    <text><cursor/></text>
                </img>
                <mediaalt>Two images</mediaalt>
            </media>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/></p>
        <figure>
            <media alt="Two images">
                <img
                    key="first"
                    src="first.png"
                    mime="image/png"
                    for="online"
                    >
                    <text><cursor/></text>
                </img>
                <img src="second.jpg" mime="image/jpeg" for="pdf">
                    <text><cursor/></text>
                </img>
                <mediaalt>Two images</mediaalt>
            </media>
        </figure>
    </document>
</value>
