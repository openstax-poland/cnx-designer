/** @jsx h */

export default editor => {
    const code = editor.value.startInline
    editor.setNodeByKey(code.key, { ...code, data: { lang: "PHP" } })
}

export const input = <value>
    <document>
        <p>Some <codeinline><cursor/>code</codeinline><text/></p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some <codeinline lang="PHP"><cursor/>code</codeinline><text/></p>
    </document>
</value>
