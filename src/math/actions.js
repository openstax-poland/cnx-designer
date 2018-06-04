/** @jsx createMenu */

import { Block, Text } from 'slate'

import createMenu from '../actions'


function insertEquation(change) {
    change.insertBlock({
        type: 'math',
        data: { mathml: '' },
    })
}


export default <group category="Insert">
    <action
        title="Equation"
        action={insertEquation}
        />
</group>
