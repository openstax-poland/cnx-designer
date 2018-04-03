import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

export default class App extends React.Component {
    render() {
        const { user } = this.props
        const initials = user.name.split(' ').map(x => x[0].toUpperCase()).join('')

        return <div className="top-bar">
            <Switch>
                <Route exact path="/new"/>
                <Route>
                    <Link to="/new">New page</Link>
                </Route>
            </Switch>
            <div className="space"/>
            <div className="profile">
                {initials}
            </div>
        </div>
    }
}
