/** @jsx h */

export default change => change.insertDefinition('after')

export const input = <value>
    <document>
        <definition>
            <defterm>Term<cursor/></defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
        <definition>
            <defterm><cursor/></defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
    </document>
</value>
