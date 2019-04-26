/** @jsx h */

export const input = <value>
    <document>
        <p key="spanish-hello">
            Normal{' '}
            <sourceinline>
                {'<foreign>hola amigo</foreign>'}
            </sourceinline>
            {' '}text.
        </p>
    </document>
</value>

export const output = cnxml`
<para id="spanish-hello">Normal <foreign xmlns="">hola amigo</foreign> text.</para>
`