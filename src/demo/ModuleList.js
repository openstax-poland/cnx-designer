import React from 'react'
import { Link } from 'react-router-dom'

import Load from '../components/Load'
import PersistDB from '../persistence/db'

async function loader() {
    const rsp = await fetch('/user/contents', { credentials: 'same-origin' })
    const [modules, persist] = await Promise.all([
        rsp.json(),
        PersistDB.open(),
    ])
    const dirty = await persist.dirty()

    return (window.module = {
        persist, dirty,
        modules: new Map(modules.map(mod => [mod.id, mod])),
    })
}

class ModuleList extends React.Component {
    state = {
        dirty: this.props.dirty,
    }

    render() {
        const { modules } = this.props
        const { dirty } = this.state

        return <div className="module-list">
            {dirty.length > 0 ? <React.Fragment>
                <h2>Unsaved changes</h2>
                {dirty.map(({ id }) =>
                    <Module
                        key={id}
                        module={modules.get(id)}
                        delete={this.delete}
                        />
                )}
            </React.Fragment> : null}
            <h2>Pages</h2>
            {Array.from(modules.values(), module =>
                <Module key={module.id} module={module}/>
            )}
        </div>
    }

    delete = async module => {
        await this.props.persist.discard(module.id)
        this.setState(({ dirty }) => ({
            dirty: dirty.filter(m => m.id !== module.id),
        }))
    }
}
export default Load(loader)(ModuleList)

class Module extends React.Component {
    render() {
        const { id, name } = this.props.module

        return <Link to={`/${id}`}>
            <span className="title">{name}</span>
            {this.props.delete ?
                <i className="material-icons" onClick={this.onDelete}>delete</i>
            : null}
        </Link>
    }

    onDelete = ev => {
        const { module, delete: delete_ } = this.props
        delete_(module)
        ev.stopPropagation()
        ev.preventDefault()
    }
}
