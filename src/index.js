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
        const headers = new Headers()
        headers.set('X-Api-Key', localStorage.getItem('api-key'))

        const rsp = await fetch('/user/contents', { headers })
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
        key: localStorage.getItem('api-key'),
    }

    componentDidMount() {
        this.authenticate()
    }

    render() {
        if (this.state.key === null) {
            return <div>Connecting</div>
        }

        return <Router>
            <React.Fragment>
                <Route exact path="/" component={Modules} />
                <Route exact path="/:id" component={App} />
            </React.Fragment>
        </Router>
    }

    async authenticate() {
        const headers = new Headers()
        let { key } = this.state

        if (window.location.search.startsWith('?token=')) {
            const [, token] = window.location.search.split('=')
            key = token
            localStorage.setItem('api-key', token)
            this.setState({ key: token })
        }

        if (key !== null) {
            headers.set('X-Api-Key', key)
            const req = await fetch('/user', { headers })
            const user = await req.json()
            this.setState({ user })
            return
        }

        window.location = '/application/3/token?callback=/'
    }
}


// ReactDOM.render(<Editor/>, document.getElementById('root'))
// window.root = ReactDOM.render(<App/>, document.getElementById('root'))

// window.root = ReactDOM.render(<Router>
//     <React.Fragment>
//         <Route exact path="/" component={Root} />
//         <Route exact path="/:id" component={App} />
//     </React.Fragment>
// </Router>, document.getElementById('root'))

ReactDOM.render(<Root/>, document.getElementById('root'))
