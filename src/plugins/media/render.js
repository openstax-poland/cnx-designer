// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import PropTypes from 'prop-types'

import Storage from '../../api/storage'

export default function renderBlock({ node, attributes, isFocused }, editor, next) {
    switch (node.type) {
    case 'image':
        return <Image
            src={node.data.get('src')}
            attributes={attributes}
            isFocused={isFocused}
            />

    default:
        return next()
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
