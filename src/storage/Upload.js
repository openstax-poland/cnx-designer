import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import Storage from './storage'
import * as utils from './utils'


const PREPARE = Symbol()
const UPLOADING = Symbol()
const RESULT = Symbol()


/**
 * @prop accept string MIME pattern
 */
export default class Upload extends React.Component {
    state = {
        files: new Map(),
        state: PREPARE,
        // Since drag events may fire also for descendants using a boolean would
        // lead to flickering. Instead we count how “deep” are we.
        dropTarget: 0,
    }

    addFiles(newFiles) {
        const pattern = utils.mimeToRegExp(this.props.accept)
        const filter = ([_, file]) => file.type.match(pattern) !== null

        this.setState(({ files }) => ({
            files: files.merge(
                Array.from(newFiles, file => [file.name, file]).filter(filter),
            ),
        }))
    }

    componentDidMount() {
        window.addEventListener('drop', this.onDrop)
        window.addEventListener('dragover', this.onDragOver)
        window.addEventListener('dragenter', this.onDragEnter)
        window.addEventListener('dragleave', this.onDragLeave)
    }

    componentWillUnmount() {
        window.removeEventListener('drop', this.onDrop)
        window.removeEventListener('dragover', this.onDragOver)
        window.removeEventListener('dragenter', this.onDragEnter)
        window.removeEventListener('dragleave', this.onDragLeave)
    }

    render() {
        const { files, state, dropTarget } = this.state
        const uploading = state === UPLOADING

        if (state === RESULT) {
            return this.renderResult()
        }

        return <div className="upload">
            <h2>Upload media files</h2>
            <div className={dropTarget ? "drop-zone target" : "drop-zone"}>
                <i className="material-icons">file_upload</i>
            </div>
            <button disabled={uploading} className="header" onClick={this.onSelectFiles}>
                <span>Click to select files.</span>
                <span>(You can also just drop them here.)</span>
            </button>
            <div className="files">
                {files.valueSeq().map(file =>
                    <FilePreview
                        key={file.name}
                        file={file}
                        state={state}
                        onDelete={this.onDeleteFile}
                        />
                )}
                {files.isEmpty() ? <div className="placeholder">
                    No files selected
                </div> : null}
            </div>
            <input multiple
                ref={input => this.input = input}
                type="file"
                accept={this.props.accept}
                onChange={this.onFilesSelected}
                />
            <button disabled={files.isEmpty() || uploading} onClick={this.onUpload}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    }

    renderResult() {
        const { failed } = this.state

        return <div className="upload">
            <h2>Upload media files</h2>
            {failed.length === 0 ? <div>All done</div> : <React.Fragment>
                <div>Some files failed to upload</div>
                {failed.map(([file, error]) =>
                    <FilePreview
                        key={file.name}
                        file={file}
                        error={error}
                        />
                )}
            </React.Fragment>}
        </div>
    }

    onSelectFiles = () => {
        this.input.click()
    }

    onDeleteFile = file => {
        this.setState(({ files }) => ({
            files: files.filter(x => x !== file),
        }))
    }

    onFilesSelected = ev => {
        this.addFiles(ev.target.files)
    }

    onDrop = ev => {
        // Prevent file from being opened
        ev.preventDefault()
        this.addFiles(ev.dataTransfer.files)
        this.setState({
            dropTarget: 0,
        })
    }

    onDragOver = ev => {
        // Only accept file transfer.
        if (ev.dataTransfer.types.includes('Files')) {
            ev.preventDefault()
        }
    }

    onDragEnter = ev => {
        this.setState(({ dropTarget }) => ({ dropTarget: dropTarget + 1 }))
    }

    onDragLeave = ev => {
        this.setState(({ dropTarget }) => ({ dropTarget: dropTarget - 1 }))
    }

    onUpload = async ev => {
        const { files } = this.state
        const { storage } = this.context
        const failed = []

        this.setState({ uploading: true })

        await Promise.all(files.valueSeq().map(async file => {
            try {
                await storage.writeFile(file)
            } catch (ex) {
                failed.push([file, ex])
            }
        }))

        if (failed.length !== 0) {
            this.setState({ state: RESULT, failed })
        }

        this.props.onUploaded(failed.length === 0)
    }

    static contextTypes = {
        storage: PropTypes.instanceOf(Storage),
    }
}


class FilePreview extends React.Component {
    render() {
        const { file, state, error } = this.props

        // TODO: Nice error messages for common errors. Currently impossible,
        // since
        //
        //     class Custom extends Error {}
        //     new Custom() instanceof Error //> false
        //
        // so we'd need to eject and replace build system (either with
        // a different babel class transform, different babel target, or a babel
        // alternative). Which I'm not going to do: configuring webpack is
        // a pain, and rollup doesn't support AMD modules well.
        const annotation = error
            ? <span className="error">{error.message}</span>
            : <span className="type">{file.type || 'unknown'}</span>

        return <div className="file">
            <Preview file={file} />
            <span className="name">{file.name}</span>
            {annotation}
            {state === PREPARE
                ? <i className="material-icons" onClick={this.onDelete}>delete</i>
                : null
            }
        </div>
    }

    onDelete = () => {
        this.props.onDelete(this.props.file)
    }
}


class Preview extends React.Component {
    constructor(...args) {
        super(...args)

        this.type = this.props.file.type.split('/', 1)[0]

        if (this.type === 'image') {
            this.url = URL.createObjectURL(this.props.file)
        }
    }

    componendWillUnmount() {
        if (this.url) {
            URL.revokeObjectURL(this.url)
        }
    }

    render() {
        if (this.url) {
            return <img src={this.url} />
        } else {
            return <div className="placeholder" />
        }
    }
}
