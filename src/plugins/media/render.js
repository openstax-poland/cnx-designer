// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function passMediaUrl(mediaUrl) {
    return function renderBlock(
        { node, attributes, children, isFocused },
        editor,
        next,
    ) {
        switch (node.type) {
        case 'audio':
            return <audio
                className="audio"
                data-selected={isFocused}
                src={mediaUrl(node.data.get('src'))}
                controls={true}
                {...attributes}
                />

        case 'image':
            return <img
                className="image"
                data-selected={isFocused}
                src={mediaUrl(node.data.get('src'))}
                {...attributes}
                />

        case 'media_alt':
            return <div className="media-alt" attributes={attributes}>
                {children}
            </div>

        case 'video':
            return <video
                className="video"
                data-selected={isFocused}
                src={mediaUrl(node.data.get('src'))}
                controls={true}
                {...attributes}
                />

        default:
            return next()
        }
    }
}
