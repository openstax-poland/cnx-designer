/** @jsx createMenu */

import { Inline } from 'slate'

import createMenu from '../actions'

import TargetSelector from './TargetSelector'


function insertXRef(change, target) {
    const ref = Inline.create({
        type: 'xref',
        data: { target },
    })

    change.insertInline(ref)
}


export default <group category="Insert">
    <action
        title="Reference"
        action={insertXRef}
        handler={TargetSelector}
        />
</group>
