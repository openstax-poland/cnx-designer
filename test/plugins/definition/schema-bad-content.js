/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <definition>
            <defmeaning>
                <p><cursor/>Meaning</p>
            </defmeaning>
            <p>Bad content</p>
            <ul><li>item</li></ul>
            <defseealso>
                <defterm>Term</defterm>
            </defseealso>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm><text/></defterm>
            <defmeaning>
                <p><cursor/>Meaning</p>
            </defmeaning>
            <defmeaning>
                <p>Bad content</p>
            </defmeaning>
            <defmeaning>
                <ul><li><p>item</p></li></ul>
            </defmeaning>
            <defseealso>
                <defterm>Term</defterm>
            </defseealso>
        </definition>
    </document>
</value>
