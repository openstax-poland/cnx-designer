import React from 'react'

import * as model from '../actions/model'
import { consolidate } from '../actions/util'

import Action from './Action'


const ActionButton = Action(({ action, ...props }) =>
    <button {...props}>
        <i className="material-icons">{action.icon}</i>
    </button>
)


export default class ToolBar extends React.Component {
    actions = consolidate(this.props.actions, true)

    render() {
        return <div className="toolbar">
            {this.actions.map(action => this.renderAction(action))}
        </div>
    }

    renderAction(action) {
        const { value, editor, onChange } = this.props

        switch (action.$$typeof) {
        case model.GROUP:
            return <div key={action.id} className="group">
                {action.items.map(action => this.renderAction(action))}
            </div>

        case model.ACTION:
            return <ActionButton
                key={action.title}
                action={action}
                value={value}
                editor={editor}
                onChange={onChange}
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
