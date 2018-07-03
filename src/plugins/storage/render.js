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

    getChildContext() {
        return {
            storage: this.props.storage,
        }
    }

    render() {
        return <React.Fragment>
            {this.props.children}
        </React.Fragment>
    }
}

export default storage => function renderEditor({ children }, editor) {
    return <StorageContext storage={storage}>
        {children}
    </StorageContext>
}
