import React from 'react'

import * as model from '../actions/model'
import { consolidate } from '../actions/util'


export default class ToolBar extends React.Component {
    state = {
        actions: consolidate(this.props.actions, true),
    }

    render() {
        const { actions } = this.state

        return <div className="toolbar">
            {actions.map(action => this.renderAction(action))}
        </div>
    }

    renderAction(action) {
        switch (action.$$typeof) {
        case model.GROUP:
            return <div key={action.id} className="group">
                {action.items.map(action => this.renderAction(action))}
            </div>

        case model.ACTION:
            return <Action
                key={action.title}
                action={action}
                value={this.props.value}
                onChange={this.props.onChange}
                />

        case model.WIDGET:
            return <div className="widget">
                {action.native}
            </div>

        default:
            throw new Error("Invalid value")
        }
    }
}


class Action extends React.Component {
    onMouseDown = ev => {
        ev.preventDefault()
    }

    onMouseUp = ev => {
        ev.preventDefault()

        const { action, value } = this.props
        const change = value.change().call(action.action)
        this.props.onChange(change)
    }

    render() {
        const { action, value } = this.props

        const attrs = {
            disabled: action.enabled ? !action.enabled(value) : false,
            title: action.title,
        }

        if (action.attrs.toggle) {
            const active = action.active ? action.active(value) : false
            attrs['data-active'] = active
        }

        return <button
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            {...attrs}
            >
            <i className="material-icons">{action.attrs.icon}</i>
        </button>
    }
}
