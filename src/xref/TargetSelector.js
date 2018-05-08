import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import Modal from '../components/Modal'


export default class TargetSelector extends React.Component {
    static contextTypes = {
        counters: PropTypes.instanceOf(Map),
    }

    render() {
        return <React.Fragment>
            {this.props.children}
            <Modal
                ref={modal => this.modal = modal}
                content={() => this.renderShelf()}
                />
        </React.Fragment>
    }

    renderShelf() {
        const { editor } = this.props
        const { counters } = this.context

        return <div className="render-targets">
            {Array.from(blocks(editor.value.document, node => {
                const cnts = counters.get(node.key)
                const label = editor.stack.find('renderXRef', node, cnts)

                if (label) {
                    return this.renderNode(node, label)
                }
            }))}
        </div>
    }

    renderNode(node, label) {
        return <div
            key={node.key}
            data-key={node.key}
            class="target"
            onClick={this.onSelect}
            >
            {label}
        </div>
    }

    onAction() {
        this.modal.open()
    }

    onSelect = ev => {
        const target = ev.target.dataset.key

        this.modal.close()
        this.props.action(target)

        // User's interaction with the shelf has likely moved focus away from
        // the editor.
        window.requestAnimationFrame(this.props.editor.focus)
    }
}


function *blocks(node, filtermap) {
    for (const child of node.nodes) {
        if (child.object !== 'block') continue

        const value = filtermap(child)
        if (value) {
            yield value
        }

        yield* blocks(child, filtermap)
    }
}
