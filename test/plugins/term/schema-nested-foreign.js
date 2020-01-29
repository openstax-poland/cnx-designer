/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <p>
            <text/>
            <term>
                <text/>
                <foreign>Foreign</foreign>
                <text/>
            </term>
            <text/>
        </p>
    </document>
</value>

export const output = <value>
    <document>
        <p>
            <text/>
            <foreign>
                <text/>
                <term>Foreign</term>
                <text/>
            </foreign>
            <text/>
        </p>
    </document>
</value>
