import { Document, Glossary } from '../../src/plugins'

import CorePlugin from './core-plugin'

export const CONTENT_PLUGINS = [
    Document(),
    CorePlugin(),
]

export const GLOSSARY_PLUGINS = [
    Glossary(),
    CorePlugin(),
]
