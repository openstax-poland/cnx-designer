// Keep this import first
import './config'

import Raven from 'raven-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Value } from 'slate'

import Editor from './editor'
import CNXML from './cnxml'
import Storage from './storage'


class App extends React.Component {
    state = {
        data: this.getData(),
        storage: null,
        id: null,
    }

    async load() {
        const storage = await Storage.load(this.props.match.params.id)
        const data = await storage.read()
        this.setState({ storage, data })
    }

    componentDidMount() {
        if (this.state.data === null) {
            this.load()
        }
    }

    render() {
        const { data, storage } = this.state

        if (data) {
            return <Editor value={data} storage={storage} />
        } else {
            return <div>Loading</div>
        }
    }

    getData() {
        if (this.props.match.params.id === 'new') {
            return Value.fromJSON({
                document: {
                    nodes: [
                        {
                            object: 'block',
                            type: 'paragraph',
                            nodes: [
                                {
                                    object: 'text',
                                    leaves: [
                                        {
                                            object: 'leaf',
                                            text: "",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            })
        }
        return null
    }
}


class Module extends React.Component {
    render() {
        const { id, name } = this.props.module

        return <Link to={`/${id}`}>
            <div className="module">
                <span className="title">{name}</span>
            </div>
        </Link>
    }
}


class Modules extends React.Component {
    state = {
        modules: null,
    }

    async load() {
        const rsp = await fetch('/user/contents', {
            credentials: 'same-origin',
        })
        const modules = await rsp.json()

        this.setState({ modules })
    }

    componentDidMount() {
        this.load()
    }

    render() {
        const { modules } = this.state

        if (modules === null) {
            return <div>Loading</div>
        }

        return <React.Fragment>
            <Link to="/new">New</Link>
            {modules.map(module =>
                <Module key={module.id} module={module} />
            )}
        </React.Fragment>
    }
}


const EMPTY = title => `<?xml version="1.0" encoding="utf-8"?>
<document xmlns="http://cnx.rice.edu/cnxml" cnxml-version="0.7" id="new" module-id="new" xml:lang="en">
    <title>${title}</title>
    <content><para/></content>
</document>`


class New extends React.Component {
    state = {
        license: undefined,
        stage: 'license',
        title: "",
        files: [],
        hasIndexCnxml: false,
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
            <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={ev =>
                    this.setState({ title: ev.target.value })
                } />

            <label>
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
        data.set('license', this.state.license)

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


class Root extends React.Component {
    state = {
        user: null,
        error: null,
    }

    componentDidMount() {
        this.authorize()
    }

    render() {
        if (this.state.error !== null) {
            return <div>{this.state.error}</div>
        }

        return this.state.user === null ? <span>Logging in</span> : <Router>
            <Switch>
                <Route exact path="/" component={Modules} />
                <Route exact path="/new" component={New} />
                <Route exact path="/:id" component={App} />
            </Switch>
        </Router>
    }

    async authorize() {
        const req = await fetch('/user', { credentials: 'same-origin' })
        if (req.status === 401) {
            window.location = '/login'
            return
        } else if (!req.ok) {
            this.setState({ error: `${req.status} — ${req.statusText}` })
            return
        }

        const user = await req.json()
        Raven.setUserContext({ id: user.id })

        this.setState({ user })
    }
}


ReactDOM.render(<Root/>, document.getElementById('root'))
