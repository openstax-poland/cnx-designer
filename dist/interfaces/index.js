// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Code } from './code';
import { Term } from './glossary';
import { Audio, Image, Video } from './media';
import { ProcessingInstruction } from './processingInstruction';
import { Footnote, Foreign } from './text';
import { CrossReference, DocumentReference, Link } from './xref';
export * from './admonition';
export * from './classes';
export * from './code';
export * from './equation';
export * from './exercise';
export * from './figure';
export * from './glossary';
export * from './list';
export * from './media';
export * from './preformat';
export * from './processingInstruction';
export * from './rule';
export * from './section';
export * from './text';
export * from './xref';
/** Check if an element is an inline element according to this schema */
export function isInline(element) {
    return Code.isCodeLine(element)
        || CrossReference.isCrossReference(element)
        || DocumentReference.isDocumentReference(element)
        || Footnote.isFootnote(element)
        || Foreign.isForeign(element)
        || Link.isLink(element)
        || Term.isTerm(element);
}
/** Check if an element is a void element according to this schema */
export function isVoid(element) {
    return Audio.isAudio(element)
        || CrossReference.isCrossReference(element)
        || Image.isImage(element)
        || ProcessingInstruction.isProcessingInstruction(element)
        || Video.isVideo(element);
}
