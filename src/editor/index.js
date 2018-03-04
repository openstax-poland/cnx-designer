import { Value, setKeyGenerator } from 'slate'
import Slate from 'slate-react'
import React, { Component } from 'react'

import Admonition from '../admonition'
import Header from '../header'
import List from '../list'
import Marks from '../marks'
import Paragraph from '../paragraph'
import Title from '../title'
import Toolbar from '../toolbar'
import Storage from '../storage/plugin'

import * as uuid from '../uuid'
setKeyGenerator(uuid.v4)


const list = List({})
const marks = Marks({})


const plugins = [
    ...marks.plugins,
    Paragraph({}),
    Header({}),
    Title({}),
    Admonition({}),
    ...list.plugins,
    Toolbar({}),
]


export default class Editor extends Component {
    state = {
        value: Value.create(),
    }

    plugins = [...plugins, Storage({ storage: this.props.storage })]

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <React.Fragment>
            <Slate.Editor
                className="editor"
                value={this.state.value}
                plugins={this.plugins}
                onChange={this.onChange}
                />
        </React.Fragment>
    }
}
