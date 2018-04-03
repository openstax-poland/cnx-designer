import Raven from 'raven-js'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import TopBar from './TopBar'
import ModuleList from './ModuleList'
import ModuleView from './ModuleView'
import NewModule from './NewModule'

const WithTopBar = (user, Component) => props => <React.Fragment>
    <TopBar user={user}/>
    <Component user={user} {...props}/>
</React.Fragment>

export default class App extends React.Component {
    state = {
        user: null,
        error: null,
    }

    componentDidMount() {
        this.authorize()
    }

    render() {
        const { user, error } = this.state

        if (error !== null) {
            return <div>{this.state.error}</div>
        }

        if (user === null) {
            return <div>Logging in</div>
        }

        return <Router>
            <Switch>
                <Route exact path="/" component={WithTopBar(user, ModuleList)}/>
                <Route exact path="/new" component={WithTopBar(user, NewModule)}/>
                <Route exact path="/:id" component={ModuleView} />
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
