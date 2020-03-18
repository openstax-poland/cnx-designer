/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <p>Before</p>
    <glossary>
        <definition>
            <defterm>Term</defterm>
        </definition>
    </glossary>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before</p>
    <p>After</p>
    <glossary>
        <definition>
            <defterm>Term</defterm>
        </definition>
    </glossary>
</editor>
