import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../components/Modal'

import Storage from './storage'
import Upload from './Upload'


const KNOWN_MIME = ['image']
const MEDIA_MIME = ['audio', 'image', 'video']


export default class Assets extends React.Component {
    render() {
        return <div className="assets">
            <div className="toolbar">
                <button onClick={this.onAddMedia}>
                    <i className="material-icons">add</i>
                </button>
            </div>
            <div className="content">
                {this.renderAssets()}
            </div>

            <Modal ref={upload => this.upload = upload}>
                <Upload onUploaded={this.onUploaded} />
            </Modal>
        </div>
    }

    renderAssets() {
        const filter = this.props.filter || (() => true)

        return this.context.storage.files.filter(filter).map(file =>
            <React.Fragment key={file.name}>
                {this.renderAsset(file)}
            </React.Fragment>
        )
    }

    renderAsset(asset) {
        let [type] = asset.mime.split('/', 1)
        if (!KNOWN_MIME.includes(type)) {
            type = 'unknown'
        }

        let content
        switch (type) {
        case 'image':
            content = <React.Fragment>
                <img src={this.context.storage.mediaUrl(asset.name)} />
                <span className="name">{asset.name}</span>
            </React.Fragment>
            break

        default:
            content = <React.Fragment>
                <span className="name">{asset.name}</span>
                <span className="mime">{asset.mime}</span>
            </React.Fragment>
            break
        }

        return <div
            className={"asset " + type}
            data-name={asset.name}
            onClick={this.onClick(asset)}
            >
            {content}
        </div>
    }

    onClick = asset => ev => {
        this.props.onSelect(asset)
    }

    onAddMedia = () => {
        this.upload.open()
    }

    onUploaded = succeess => {
        if (succeess) {
            this.upload.close()
        }
        // XXX: Since Storage is mutable there's nothing we can update in state
        // to cause rerender, and thus we have to force it.
        this.forceUpdate()
    }

    static contextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }

    static media = ({ mime }) => MEDIA_MIME.includes(mime.split('/', 1)[0])
}
