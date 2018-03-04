import React from 'react'
import PropTypes from 'prop-types'

import Storage from './storage'


class StorageContext extends React.Component {
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

    // Storage is passed in context to minimise impact on components which don't
    // use it.
    static childContextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }
}


export default storage => function renderEditor({ children }, editor) {
    return <StorageContext storage={storage}>
        {children}
    </StorageContext>
}
