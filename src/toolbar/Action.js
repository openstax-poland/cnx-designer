import React from 'react'


/**
 * @prop action
 * @prop value
 * @prop editor
 * @prop onClick
 * @prop onChange
 */
export default Widget => class Action extends React.Component {
    // Prevent focus from moving.
    onMouseDown = ev => ev.preventDefault()

    onMouseUp = ev => {
        ev.preventDefault()

        // Notify about click. Menu uses this to close itself.
        const { onClick } = this.props
        if (onClick) onClick()

        if (this.handler) {
            this.handler.onAction()
        } else {
            this.action()
        }
    }

    render() {
        const { action, value, editor } = this.props

        const className = "action"

        const attrs = {
            disabled: action.enabled ? !action.enabled(value) : false,
            title: action.title,
        }

        if (action.attrs.toggle) {
            const active = action.active ? action.active(value) : false
            attrs['data-active'] = active
        }

        let r = <Widget
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            action={action}
            {...attrs}
            />

        if (action.attrs.handler) {
            const Handler = action.attrs.handler
            r = <Handler
                ref={handler => this.handler = handler}
                action={this.action.bind(this)}
                editor={editor}
                value={value}
                >
                {r}
            </Handler>
        }

        return r
    }

    action(...args) {
        const { action, value } = this.props
        const change = value.change().call(action.action, ...args)
        this.props.onChange(change)
    }
}
