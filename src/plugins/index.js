// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Counters from 'slate-counters'

import Admonition from './admonition'
import Exercise from './exercise'
import Figure from './figure'
import List from './list'
import Media from './media'
import Section from './section'
import Text from './text'
import Title from './title'
import XReference from './xref'
import Table from './table'

export default [
    Admonition(),
    Exercise(),
    Figure(),
    Media(),
    Section(),
    Text(),
    Title(),
    Counters(),
    XReference(),
    List(),
    Table(),
]
