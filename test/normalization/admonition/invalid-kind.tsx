/** @jsx h */

import { AdmonitionKind } from '../../../src'

export const input = <editor>
    <element type="admonition" kind={"invalid" as AdmonitionKind}>
        <p><cursor/>Text</p>
    </element>
</editor>

export const output = <editor>
    <note>
        <p><cursor/>Text</p>
    </note>
</editor>
