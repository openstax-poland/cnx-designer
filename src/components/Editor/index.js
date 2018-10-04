import React from 'react'
import Slate from 'slate-react'
import { KeyUtils } from 'slate'

import plugins from '../../plugins'
import Persistence from '../../plugins/persistence'
import Storage from '../../plugins/storage'
import { uuid } from '../../util'

KeyUtils.setGenerator(uuid.v4)

export default class Editor extends React.Component {
    props: {
        documentDb: DocumentDB,
        storage: Storage,
        value: SlateValue,
        plugins?: SlatePlugin[],
    }

    state = {
        value: this.props.value,
    }

    plugins = [
        Persistence({ db: this.props.documentDb }),
        Storage({ storage: this.props.storage }),
        ...this.props.prePlugins || [],
        ...plugins,
        ...this.props.postPlugins || [],
    ]

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <Slate.Editor
            className="editor"
            value={this.state.value}
            plugins={this.plugins}
            onChange={this.onChange}
            />
    }
}
