// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import PropTypes from 'prop-types'

import Storage from '../../api/storage'

/**
 * Provide current {@link Storage} as a React context for easy access by node
 * components.
 */
class StorageContext extends React.Component {
    // Storage is passed in context to minimise impact on components which don't
    // use it.
    static childContextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }

    static propTypes = {
        storage: PropTypes.instanceOf(Storage).isRequired,
        children: PropTypes.node,
    }

    getChildContext() {
        return {
            storage: this.props.storage,
        }
    }

    render() {
        return this.props.children
    }
}

export default storage => function renderEditor(props, editor, next) {
    return <StorageContext storage={storage}>
        {next()}
    </StorageContext>
}
