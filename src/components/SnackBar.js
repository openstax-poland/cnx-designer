import React from 'react'
import PropTypes from 'prop-types'


export default class SnackBar extends React.Component {
    state = {
        snacks: [],
        nextId: 0,
        callbackId: null,
    }

    show(text, action=null) {
        this.setState(({ snacks, nextId }) => ({
            snacks: snacks.concat({
                id: nextId,
                text, action
            }),
            nextId: nextId + 1,
        }))
    }

    getChildContext() {
        return {
            snackBar: this,
        }
    }

    componentDidUpdate() {
        const { snacks, callbackId } = this.state

        if (snacks.length > 0 && callbackId === null) {
            this.setState({
                callbackId: window.setTimeout(this._dismiss, 4000)
            })
        }
    }

    render() {
        const { children } = this.props
        const { snacks } = this.state

        const exiting = snacks.length > 0 && snacks[0].exiting ? snacks[0] : null
        const snack = exiting === null ? snacks[0] : snacks[1]

        return <React.Fragment>
            {children}
            <div className="snack-bar">
            {snack ? <Snack key={snack.id} {...snack} /> : null}
            {exiting ? <Snack key={exiting.id} exiting={true} {...exiting} /> : null}
            </div>
        </React.Fragment>
    }

    _dismiss = () => {
        const { snacks } = this.state

        if (snacks[0].exiting) {
            snacks.shift()
        }

        let callbackId = null
        if (snacks.length > 0) {
            snacks[0].exiting = true
            callbackId = window.setTimeout(this._dismiss, 4000)
        }

        this.setState({ snacks, callbackId })
    }

    static childContextTypes = {
        snackBar: PropTypes.instanceOf(SnackBar),
    }
}


class Snack extends React.Component {
    render() {
        const { text, action, exiting } = this.props

        const className = exiting ? 'snack exiting' : 'snack'

        return <div className={className}>
            <span className="text">{text}</span>
            {action ? <span className="action">{action}</span> : null}
        </div>
    }
}
