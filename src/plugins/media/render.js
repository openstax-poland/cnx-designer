import React from 'react'
import PropTypes from 'prop-types'

import Storage from '../../api/storage'

export default function renderNode({ node, attributes, isFocused }) {
    switch (node.type) {
    case 'image':
        return <Image
            src={node.data.get('src')}
            attributes={attributes}
            isFocused={isFocused}
            />

    default:
    }
}

class Image extends React.PureComponent {
    render() {
        const { src, attributes, isFocused } = this.props

        // TODO: alt-text
        return <img
            className="image"
            data-selected={isFocused}
            src={this.context.storage.mediaUrl(src)}
            alt=""
            {...attributes}
            />
    }

    static contextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }
}
