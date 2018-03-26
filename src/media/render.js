import React from 'react'
import PropTypes from 'prop-types'

import Storage from '../storage'


class Image extends React.Component {
    render() {
        const { src, attributes, selected } = this.props

        return <img
            className="image"
            data-selected={selected}
            src={this.context.storage.mediaUrl(src)}
            alt=""
            {...attributes}
            />
    }

    static contextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }
}


export default function renderNode({ node, attributes, isSelected }) {
    switch (node.type) {
    case 'image':
        return <Image
            src={node.data.get('src')}
            attributes={attributes}
            selected={isSelected}
            />

    default:
        return
    }
}
