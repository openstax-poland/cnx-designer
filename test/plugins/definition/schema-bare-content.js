/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defexample>
            <p>Example</p>
        </defexample>
        <defseealso>
            <defterm>Term</defterm>
        </defseealso>
    </document>
</value>

// Glossary can contains only definitions
export const output = <value><document></document></value>
