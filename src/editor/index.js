import { Value, setKeyGenerator } from 'slate'
import Slate from 'slate-react'
import React, { Component } from 'react'

import Admonition from '../admonition'
import Exercise from '../exercise'
import Figure from '../figure'
import Header from '../header'
import List from '../list'
import Marks from '../marks'
import Media from '../media'
import Paragraph from '../paragraph'
import Persistence from '../persistence'
import Section from '../section'
import Storage from '../storage/plugin'
import Title from '../title'
import Toolbar from '../toolbar'

import * as A from '../actions/model'
import ErrorBoundary from './ErrorBoundary'
import SnackBar from '../components/SnackBar'

import * as uuid from '../uuid'
setKeyGenerator(uuid.v4)


const list = List({})
const marks = Marks({})


const plugins = [
    ...marks.plugins,
    Paragraph({}),
    Header({}),
    Title({}),
    Section({}),
    Exercise({}),
    Admonition({}),
    ...list.plugins,
    Figure({}),
    Media({}),
    Toolbar({}),
]


export default class Editor extends Component {
    state = {
        value: this.props.value,
        crash: false,
    }

    plugins = [
        Storage({ storage: this.props.storage }),
        ...plugins,
        {
            actions: A.group(null, 'Document', [
                A.action('Crash', {
                    action: () => this.setState({ crash: true }),
                }),
            ]),
        },
        Persistence({ db: this.props.persist }),
    ]

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <ErrorBoundary>
            <Crash crash={this.state.crash}/>
            <SnackBar>
                <Slate.Editor
                    className="editor"
                    value={this.state.value}
                    plugins={this.plugins}
                    onChange={this.onChange}
                    />
            </SnackBar>
        </ErrorBoundary>
    }
}

function Crash({ crash }) {
    if (crash) {
        throw new Error("Hello, I'm an error!")
    }
    return null
}
