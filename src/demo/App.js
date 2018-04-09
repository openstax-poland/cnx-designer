import Raven from 'raven-js'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Load from '../components/Load'

import TopBar from './TopBar'
import ModuleList from './ModuleList'
import ModuleView from './ModuleView'
import NewModule from './NewModule'

const WithTopBar = (user, Component) => props => <React.Fragment>
    <TopBar user={user}/>
    <Component user={user} {...props}/>
</React.Fragment>

async function login() {
    const req = await fetch('/user', { credentials: 'same-origin' })
    if (req.status === 401) {
        window.location = '/login'
        return
    } else if (!req.ok) {
        throw new Error(`${req.status} — ${req.statusText}`)
    }

    const user = await req.json()
    Raven.setUserContext({ id: user.id })

    return { user }
}

class App extends React.Component {
    render() {
        const { user } = this.props

        return <Router>
            <Switch>
                <Route exact path="/" component={WithTopBar(user, ModuleList)}/>
                <Route exact path="/new" component={WithTopBar(user, NewModule)}/>
                <Route exact path="/:id" component={ModuleView} />
            </Switch>
        </Router>
    }
}
export default Load(login)(App)
