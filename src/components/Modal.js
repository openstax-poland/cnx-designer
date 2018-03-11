import React from 'react'
import { Portal } from 'react-portal'


export default class Modal extends React.Component {
    state = {
        open: this.props.open || false,
    }

    open() {
        this.setState({ open: true })
    }

    close() {
        this.setState({ open: false })
    }

    render() {
        if (!this.state.open) return null

        const { content, children } = this.props
        const c = content ? content() : children

        return <Portal
            node={document.getElementById('modal-root')}
            >
            <div
                className="modal"
                tabIndex="0"
                onClick={this.onClick}
                onKeyDown={this.onKeyDown}
                ref={el => this.back = el}
                >
                {c}
            </div>
        </Portal>
    }

    onClick = ev => {
        if (ev.target === this.back) {
            this.onClose()
        }
    }

    onKeyDown = ev => {
        if (ev.key === 'Escape') {
            this.onClose()
        }
    }

    onClose() {
        const { onClose } = this.props

        this.close()

        if (onClose) onClose()
    }
}
