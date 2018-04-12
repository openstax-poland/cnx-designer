import Raven from 'raven-js'
import React from 'react'
import PropTypes from 'prop-types'

import SnackBar from '../components/SnackBar'

import Storage, { APIError } from './storage'


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
            window.ex = ex

            if (ex instanceof APIError) {
                snackBar.show(describeError(ex))
            } else {
                throw ex
            }
        }
    }

    static contextTypes = {
        snackBar: PropTypes.instanceOf(SnackBar),
        storage: PropTypes.instanceOf(Storage),
    }
}


function describeError(ex) {
    switch (ex.status) {
    case 400: // Bad request
        return "New version of the application is required. Please reload and \
        try again. Your changes have been saved locally."

    case 401: // Unauthorized
    case 402: // Forbidden
        return "You have been logged out."

    case 404: // Not found
        return "Document was not found. It may have been deleted."

    case 408: // Request timeout
        return "Server accepted connection but did not respond. \
        Please try again later."

    case 409: // Conflict
    case 412: // Precondition failed
        return "Can't save as there were changes made to the document after \
        you opened it."

    default:
        Raven.captureException(ex)
        return `Save failed for unknown reason, please reload the page and try \
        again (your changes have been saved locally). If the problem persists \
        please contact support. Error description is “${ex.message}”.`
    }
}
