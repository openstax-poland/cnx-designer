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

function Image({ src, attributes, isFocused }, { storage }) {
    return <img
        className="image"
        data-selected={isFocused}
        src={storage.mediaUrl(src)}
        {...attributes}
        />
}

Image.contextTypes = {
    storage: PropTypes.instanceOf(Storage),
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
}
