import Raven from 'raven-js'
import React from 'react'

export default class ErrorBoundary extends React.Component {
    state = {
        error: null,
    }

    componentDidCatch(error, info) {
        this.setState({ error })

        Raven.captureException(error, { extra: info })
    }

    render() {
        return this.state.error ? <ErrorMessage/> : this.props.children
    }
}

class ErrorMessage extends React.Component {
    render() {
        const hasReport = Raven.lastEventId() !== null

        return <div className="error-message">
            <h1>Something went wrong</h1>
            <p>It's not your fault, it should not have happened.</p>
            <p>
                To prevent errors from corrupting your document we disabled
                editing until you reload the page. Don't worry about your work;
                it has been auto-saved and will be restored after reload.
            </p>
            {hasReport ?
                <p>
                    We have received an automatic error report, but would
                    appreciate if you could spare some time and fill out
                    a more detailed one.
                </p>
            : null}
            <div className="buttons">
                <button onClick={() => window.location.reload()}>
                    Reload page
                </button>
                {hasReport ?
                    <button onClick={() => Raven.showReportDialog()}>
                        Fill out a report
                    </button>
                : null}
            </div>
        </div>
    }
}
