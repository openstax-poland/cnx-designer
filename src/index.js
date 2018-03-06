import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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


class Root extends React.Component {
    state = {
        user: null,
    }

    render() {
        return <Router>
            <React.Fragment>
                <Route exact path="/" component={Modules} />
                <Route exact path="/:id" component={App} />
            </React.Fragment>
        </Router>
    }
}


ReactDOM.render(<Root/>, document.getElementById('root'))
