import CorePlugin from './core-plugin'
import { Document, Glossary } from '../../src/plugins'

export const CONTENT_PLUGINS = [
    Document(),
    CorePlugin(),
]

export const GLOSSARY_PLUGINS = [
    Glossary(),
    CorePlugin(),
]
