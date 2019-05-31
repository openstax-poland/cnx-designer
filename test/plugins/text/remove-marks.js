/** @jsx h */

export default editor => editor.removeMarks()

// Currently after marks are removed we're left with a bunch of unmerged leafs,
// which is hard to represent in hyperscript.
export const skip = true

export const input = <value>
    <document>
        <p><b>Before</b>, <i>aft<u>er<cursor/>,</u></i> end</p>
    </document>
</value>

export const output = <value>
    <document>
        <p><b>Before</b>, after<cursor/>, end</p>
    </document>
</value>
