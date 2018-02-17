import { Value } from 'slate'
import Slate from 'slate-react'
import React, { Component } from 'react'

import Admonition from '../admonition'
import List from '../list'
import Paragraph from '../paragraph'


const list = List({})


const plugins = [
    Paragraph({}),
    Admonition({}),
    ...list.plugins,
]


export default class Editor extends Component {
    state = {
        value: Value.create(),
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <React.Fragment>
            <Slate.Editor
                className="editor"
                value={this.state.value}
                plugins={plugins}
                onChange={this.onChange}
                />
        </React.Fragment>
    }
}
