// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, NodeEntry } from 'slate'

import normalizeAdmonition from './admonition'
import normalizeClasses from './classes'
import normalizeExercise from './exercise'
import normalizeFigure from './figure'
import normalizeGlossary from './glossary'
import normalizeRule from './rule'
import normalizeStructure from './structure'
import normalizeText from './text'
import normalizeXref from './xref'

export default function normalizeNode(
    normalizeNode: (entry: NodeEntry) => void,
    editor: Editor,
    entry: NodeEntry,
): void {
    if (
        normalizeAdmonition(editor, entry)
        || normalizeClasses(editor, entry)
        || normalizeExercise(editor, entry)
        || normalizeFigure(editor, entry)
        || normalizeGlossary(editor, entry)
        || normalizeRule(editor, entry)
        || normalizeStructure(editor, entry)
        || normalizeText(editor, entry)
        || normalizeXref(editor, entry)
    ) {
        return
    }

    // Fall back to original normalizeNode.
    normalizeNode(entry)
}
