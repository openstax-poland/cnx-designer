import React from 'react'

import Modal from '../components/Modal'
import Assets from '../storage/Assets'


export default class AssetSelector extends React.Component {
    render() {
        // Assets can't be a child of <button>, because then every click inside
        // the dialog will cause it to reopen.
        return <React.Fragment>
            {this.props.children}
            <Modal
                ref={assets => this.assets = assets}
                content={() => <Assets
                    onSelect={this.onSelect}
                    filter={Assets.media}
                    />
                }
                />
        </React.Fragment>
    }

    onAction() {
        this.assets.open()
    }

    onSelect = asset => {
        this.assets.close()
        this.props.action(asset)

        // User's interaction with the shelf has likely moved focus away from
        // the editor.
        window.requestAnimationFrame(this.props.editor.focus)
    }
}
