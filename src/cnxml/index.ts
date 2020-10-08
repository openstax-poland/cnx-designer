// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Node } from 'slate'

/**
 * Version of CNXML used for a document
 *
 * The only difference between version 0.7 and 0.8 is that 0.7 uses MathML 2.0
 * and 0.8 uses MathML 3.0.
 */
export type CnxmlVersion = '0.7' | '0.8'

/** A serialized CNXML document */
export interface Document {
    /** Class names for the <document> element */
    classes?: string[]
    /** ISO language code naming the primary language of this document */
    language?: string
    /** Document's title */
    title: string
    /**
     * ID of the document in a content repository
     *
     * It is left unspecified to which content repository this ID belongs.
     */
    moduleId: string
    /** Version of CNXML used for this document */
    version: CnxmlVersion
    /** Content of the document */
    content: Node[]
    /** Additional properties set by extensions */
    [key: string]: unknown
}

export { default as deserialize } from './de'
export { default as serialize } from './se'
export * as JSX from './jsx'
export * from './de'
export * from './se'
