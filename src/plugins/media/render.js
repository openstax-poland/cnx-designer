// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import PropTypes from 'prop-types'

import Storage from '../../api/storage'

export default function renderBlock({ node, attributes, children, isFocused }, editor, next) {
    switch (node.type) {
    case 'image':
        return <Image
            src={node.data.get('src')}
            attributes={attributes}
            isFocused={isFocused}
            />

    case 'media_alt':
        return <div className="media-alt" attributes={attributes}>
            {children}
        </div>

    default:
        return next()
    }
}

class Image extends React.PureComponent {
    render() {
        const { src, attributes, isFocused } = this.props

        return <img
            className="image"
            data-selected={isFocused}
            src={this.context.storage.mediaUrl(src)}
            {...attributes}
            />
    }

    static contextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }
}
