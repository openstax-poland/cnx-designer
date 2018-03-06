/** @jsx createMenu */

import createMenu from '../actions'


function insertFigure(change) {
    change.insertBlock({
        type: 'figure',
        nodes: [
            {
                object: 'block',
                type: 'figure_caption',
                nodes: [
                    {
                        object: 'text',
                        leaves: [""],
                    },
                ],
            },
        ],
    })
}


export default <group category="Insert">
    <action title="Figure" action={insertFigure} icon="insert_photo" />
</group>
