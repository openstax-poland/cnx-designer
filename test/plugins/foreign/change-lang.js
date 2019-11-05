/** @jsx h */

export default editor => {
    const foreign = editor.value.startInline
    editor.setNodeByKey(foreign.key, {
        data: {
            lang: 'pl',
        },
    })
}

export const input = <value>
    <document>
        <p>Before <foreign><cursor/>foreign</foreign> after</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <foreign lang="pl"><cursor/>foreign</foreign> after</p>
    </document>
</value>
