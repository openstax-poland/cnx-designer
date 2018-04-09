import React from 'react'

export default loader => Component => class Load extends React.Component {
    state = {
        value: null,
        error: null,
    }

    componentDidMount() {
        loader(this.props)
            .then(value => this.setState({ value }))
            .catch(error => this.setState({ error }))
    }

    render() {
        const { value, error } = this.state

        if (error) return <div>{error.toString()}</div>
        if (value === null) return <div>Loading</div>

        return <Component {...value}/>
    }
}
