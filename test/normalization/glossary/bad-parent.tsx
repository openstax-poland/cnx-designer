/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <note>
        <p>Invalid parent for a glossary</p>
        <glossary id="1">
            <definition>
                <defterm>Term</defterm>
            </definition>
        </glossary>
    </note>
</editor>

export const output = <editor>
    <note>
        <p>Invalid parent for a glossary</p>
    </note>
    <glossary id="1">
        <definition>
            <defterm>Term</defterm>
        </definition>
    </glossary>
</editor>
