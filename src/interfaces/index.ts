// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

import { Admonition } from './admonition'
import { WithClasses } from './classes'
import { Code, CodeBlock, CodeLine } from './code'
import { Equation } from './equation'
import { Commentary, Exercise, Problem, Solution } from './exercise'
import { Figure } from './figure'
import {
    Definition, DefinitionExample, DefinitionTerm, Glossary, Meaning, NameTerm, SeeAlso, Term,
} from './glossary'
import { BulletedList, EnumeratedList, ListItem } from './list'
import { AltText, Audio, Image, Media, Video } from './media'
import { Preformat } from './preformat'
import { ProcessingInstruction } from './processingInstruction'
import { Proof, Rule, RuleExample, Statement } from './rule'
import { Section } from './section'
import { Caption, Footnote, Foreign, Paragraph, Quotation, Title } from './text'
import { CrossReference, DocumentReference, Link } from './xref'

export * from './admonition'
export * from './classes'
export * from './code'
export * from './equation'
export * from './exercise'
export * from './figure'
export * from './glossary'
export * from './list'
export * from './media'
export * from './preformat'
export * from './processingInstruction'
export * from './rule'
export * from './section'
export * from './text'
export * from './xref'

/// Types of elements defined by the CNXML specification
export type CnxElement =
    | Admonition
    | AltText
    | Audio
    | BulletedList
    | Caption
    | CodeBlock
    | CodeLine
    | Commentary
    | CrossReference
    | Definition
    | DefinitionExample
    | DefinitionTerm
    | DocumentReference
    | EnumeratedList
    | Equation
    | Exercise
    | Figure
    | Footnote
    | Foreign
    | Glossary
    | Image
    | Link
    | ListItem
    | Meaning
    | Media
    | NameTerm
    | Paragraph
    | Preformat
    | Problem
    | ProcessingInstruction
    | Proof
    | Quotation
    | Rule
    | RuleExample
    | Section
    | SeeAlso
    | Solution
    | Statement
    | Term
    | Title
    | Video

/// Properties which must be mixed into `CustomTypes.Element`
///
/// When extending `designer` you must do the following
/// ```
/// import { CnxElement, ElementExtensions } from 'cnx-designer'
///
/// export type MyElement = CnxElement | ...
///
/// declare module 'slate' {
///     interface CustomTypes {
///         Element: MyElement & ElementExtensions
///     }
/// }
/// ```
export type ElementExtensions = Partial<WithClasses> & {
    id?: string,
}

/// Properties which must be mixed into `CustomTypes.Text`
///
/// When extending `designer` you must do the following
/// ```
/// import { StyledText, TextExtensions } from 'cnx-designer'
///
/// export type MyText = StyledText & ...
///
/// declare module 'slate' {
///     interface CustomTypes {
///         Text: MyText & TextExtensions
///     }
/// }
/// ```
export type TextExtensions = {
    id?: string,
}

/** Check if an element is an inline element according to this schema */
export function isInline(element: Element): boolean {
    return Code.isCodeLine(element)
        || CrossReference.isCrossReference(element)
        || DocumentReference.isDocumentReference(element)
        || Footnote.isFootnote(element)
        || Foreign.isForeign(element)
        || Link.isLink(element)
        || Term.isTerm(element)
}

/** Check if an element is a void element according to this schema */
export function isVoid(element: Element): boolean {
    return Audio.isAudio(element)
        || CrossReference.isCrossReference(element)
        || DocumentReference.isDocumentReference(element)
        || Image.isImage(element)
        || ProcessingInstruction.isProcessingInstruction(element)
        || Video.isVideo(element)
}
