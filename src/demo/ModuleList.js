import React from 'react'
import { Link } from 'react-router-dom'

export default class ModuleList extends React.Component {
    state = {
        modules: null,
    }

    componentDidMount() {
        this.load()
    }

    render() {
        const { modules } = this.state

        if (modules === null) return <div>Loading</div>

        return <div className="module-list">
            <h2>Pages</h2>
            {modules.map(module =>
                <Module key={module.id} module={module}/>
            )}
        </div>
    }

    async load() {
        const rsp = await fetch('/user/contents', { credentials: 'same-origin' })
        const modules = await rsp.json()

        this.setState({ modules })
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
