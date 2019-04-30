// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Counters from 'slate-counters'
import Persistence from './persistence'
import Storage from './storage'

import Admonition from './admonition'
import Definition from './definition'
import Exercise from './exercise'
import Figure from './figure'
import List from './list'
import Media from './media'
import Section from './section'
import Text from './text'
import Title from './title'
import XReference from './xref'

export default {
    counters: Counters(),
    persistence: Persistence,
    storage: Storage,
    common: [
        Text(),
        XReference(),
    ],
    content: [
        Admonition(),
        Exercise(),
        Figure(),
        Media(),
        List(),
        Section(),
        Title(),
    ],
    glossary: [
        Definition(),
    ],
}
