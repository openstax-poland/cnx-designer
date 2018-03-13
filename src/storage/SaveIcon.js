import React from 'react'
import PropTypes from 'prop-types'

import SnackBar from '../components/SnackBar'

import Storage from './storage'


export default class SaveIcon extends React.Component {
    render() {
        return this.props.children
    }

    async onAction() {
        const { snackBar, storage } = this.context

        try {
            await storage.write(this.props.value)
            snackBar.show('Saved!')
        } catch (ex) {
            console.error(ex)
            snackBar.show('Cannot save.')
        }
    }

    static contextTypes = {
        snackBar: PropTypes.instanceOf(SnackBar),
        storage: PropTypes.instanceOf(Storage),
    }
}
