// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Counters from 'slate-counters'

import Admonition from './admonition'
import Exercise from './exercise'
import Figure from './figure'
import List from './list'
import Media from './media'
import Quotation from './quotation'
import Section from './section'
import Term from './term'
import Text from './text'
import Title from './title'
import XReference from './xref'

export default [
    Admonition(),
    Exercise(),
    Figure(),
    Media(),
    Section(),
    Term(),
    Text(),
    Title(),
    Counters(),
    XReference(),
    List(),
    Quotation(),
]
