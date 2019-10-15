// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

import { StorageContext } from '../../api/storage'

/**
 * Provide current {@link Storage} as a React context for easy access by node
 * components.
 */
export default storage => function renderEditor(props, editor, next) {
    return <StorageContext.Provider value={storage}>
        {next()}
    </StorageContext.Provider>
}
