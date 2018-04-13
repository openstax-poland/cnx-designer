import Raven from 'raven-js'
import React from 'react'

export default (loader, handler) => Component => class Load extends React.Component {
    static displayName = `Load(${Component.displayName || Component.name})`

    state = {
        value: null,
        error: null,
    }

    async componentDidMount() {
        try {
            const value = await loader(this.props)
            this.setState({ value })
        } catch (ex) {
            const description = handler ? handler(ex) : null
            if (description) {
                this.setState({ error: description })
            } else {
                this.setState({ error: ex })
                Raven.captureError(ex)
            }
        }
    }

    render() {
        const { value, error } = this.state

        if (error) return <div>{error.toString()}</div>
        if (value === null) return <div>Loading</div>

        return <Component {...value}/>
    }
}
