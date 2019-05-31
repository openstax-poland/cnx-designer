/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <quote>
            <quote>
                <p>Content</p>
            </quote>
        </quote>
        <quote>
            <quote>
                <p>First quote</p>
            </quote>
            <quote>
                <p>Second quote</p>
            </quote>
        </quote>
    </document>
</value>

export const output = <value>
    <document>
        <quote>
            <p>Content</p>
        </quote>
        <quote>
            <quote>
                <p>First quote</p>
            </quote>
            <quote>
                <p>Second quote</p>
            </quote>
        </quote>
    </document>
</value>
