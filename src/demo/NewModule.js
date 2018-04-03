import React from 'react'

import Upload from '../storage/Upload'

const EMPTY = title => `<?xml version="1.0" encoding="utf-8"?>
<document xmlns="http://cnx.rice.edu/cnxml" cnxml-version="0.7" id="new" module-id="new" xml:lang="en">
    <title>${title}</title>
    <content><para/></content>
</document>`

export default class NewModule extends React.Component {
    fileInput: any

    state = {
        stage: 'license',
        licenses: [],
        license: -1,
        title: "",
        hasIndexCnxml: false,
        files: [],
    }

    componentDidMount() {
        this.loadLicenses()
    }

    render() {
        const { stage } = this.state

        return <div className="new">
            {stage === 'input' ? this.renderForm() : null}
            {stage === 'create' ? <span>Creating module</span> : null}
            {stage === 'upload' ? <span>Uploading files</span> : null}
        </div>
    }

    renderForm() {
        const { hasIndexCnxml, title } = this.state
        const disabled = title.length === 0

        return <form onSubmit={this.submit}>
            <label>
                <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={ev =>
                    this.setState({ title: ev.target.value })
                } />

                <span>License</span>
                <select
                    value={this.state.license}
                    onChange={ev => this.setState({ license: Number(ev.target.value) })}
                    >
                    {this.state.licenses.map(license =>
                        <option key={license.id} value={license.id}>
                            {license.name}
                        </option>
                    )}
                </select>
            </label>

            <div>
                <input
                    type="file" multiple
                    ref={input => {this.fileInput = input}}
                    style={{display: 'none'}}
                    onChange={this.onFiles}
                    />
                <button onClick={this.addFiles}>Add files</button>
                {hasIndexCnxml ? null : <div>
                    A file named index.cnxml is required.
                </div>}
                {this.state.files.map(file => this.renderFile(file))}
            </div>

            <input type="submit" value="Upload and create" disabled={disabled || !hasIndexCnxml} />
            <input type="submit" value="Create empty" disabled={disabled} onClick={this.onCreateEmpty} />
        </form>
    }

    renderFile({ file, type }) {
        return <div className="file" key={file.name}>
            <span>{file.name}</span>
            <span>{type}</span>
        </div>
    }

    submit = ev => {
        ev.preventDefault()
        this.setState({ stage: 'create' })
        this.create()
    }

    addFiles = ev => {
        ev.preventDefault()
        this.fileInput.click()
    }

    onFiles = ev => {
        const files = []
        let hasIndexCnxml = false

        for (const file of ev.target.files) {
            let type = file.type

            if (type === '' && file.name === 'index.cnxml') {
                type = 'application/vnd.openstax.cnx+xml'
                hasIndexCnxml = true
            }

            files.push({ file, type })
        }

        this.setState({ files, hasIndexCnxml })
    }

    onCreateEmpty = ev => {
        ev.preventDefault()
        this.setState(({ title }) => ({
            stage: 'create',
            files: [{
                file: new File([EMPTY(title)], 'index.cnxml', { type: 'application/vnd.openstax.cnx+xml'} ),
                type: 'application/vnd.openstax.cnx+xml',
            }]
        }), this.create)
    }

    async loadLicenses() {
        const req = await fetch('/licenses')
        const licenses = await req.json()
        this.setState({
            stage: 'input',
            licenses: licenses,
            license: licenses[0].id,
        })
    }

    async create() {
        const data = new URLSearchParams()
        data.set('kind', 'module')
        data.set('name', this.state.title)
        data.set('license', this.state.license.toString())

        const req = await fetch('/user/contents', {
            credentials: 'same-origin',
            method: 'post',
            body: data,
        })
        const module = await req.json()

        await Promise.all(this.state.files.map(async ({ file, type }) => {
            const path = '/user/contents/' + module.id + '/files/' + file.name
            const headers = new Headers()
            headers.set('Content-Type', type)

            const req = await fetch(path, {
                credentials: 'same-origin',
                method: 'put',
                headers: headers,
                body: file,
            })
        }))

        this.props.history.replace('/' + module.id)
    }
}
