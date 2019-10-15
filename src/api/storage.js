// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/* istanbul ignore file */

export class Storage {
    /**
     * Return an URL for a given media file.
     */
    mediaUrl(name) {
        console.warn('You are using default Storage class.')
        return name
    }
}

export const StorageContext = React.createContext(new Storage())
