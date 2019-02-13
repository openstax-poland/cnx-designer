// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import Slate from 'slate-react'
import { KeyUtils } from 'slate'

import plugins from '../../plugins'
import Persistence from '../../plugins/persistence'
import Storage from '../../plugins/storage'
import { uuid } from '../../util'

KeyUtils.setGenerator(uuid.v4)

export default class Editor extends React.Component {
    /*props: {
        documentDb: DocumentDB,
        storage: Storage,
        value: SlateValue,
        plugins?: SlatePlugin[],
    }*/

    state = {
        value: this.props.value,
    }

    plugins = [
        Storage({ storage: this.props.storage }),
        ...this.props.prePlugins || [],
        ...plugins,
        ...this.props.postPlugins || [],
        Persistence({ db: this.props.documentDb }),
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
