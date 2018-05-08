import { Value, setKeyGenerator } from 'slate'
import Slate from 'slate-react'
import React, { Component } from 'react'
import Counters from 'slate-counters'

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
import XReference from '../xref'

import ErrorBoundary from './ErrorBoundary'
import SnackBar from '../components/SnackBar'

import * as uuid from '../uuid'
setKeyGenerator(uuid.v4)


const list = List({})
const marks = Marks({})


const plugins = [
    Counters(),
    ...marks.plugins,
    Paragraph({}),
    XReference({}),
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
        value: Value.create(),
    }

    plugins = [
        Storage({ storage: this.props.storage }),
        ...plugins,
        Persistence({ db: this.props.persist }),
    ]

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <ErrorBoundary>
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
