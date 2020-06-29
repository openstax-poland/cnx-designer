/// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node, NodeEntry, Path, Transforms } from 'slate'

import { Definition, DefinitionTerm, DefinitionExample, Glossary, Meaning, SeeAlso, Term } from '../interfaces'
import { normalizeOrderedChildren, previousOverOnly } from './util'

/**
 * Normalize glossary
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeGlossary(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (Glossary.isGlossary(node)) {
        // Glossary must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // Glossary may only be a child of the document itself.
        if (path.length > 1) {
            Transforms.moveNodes(editor, {
                at: path,
                to: [editor.children.length],
            })
            return true
        }

        // Glossary must be the last element.
        const [next, nextPath] = Editor.next(editor, { at: path }) ?? []
        if (next != null) {
            if (Glossary.isGlossary(next)) {
                Transforms.mergeNodes(editor, { at: nextPath })
            } else {
                Transforms.moveNodes(editor, {
                    at: nextPath,
                    to: path,
                })
            }
            return true
        }
    }

    // A glossary definition.
    if (Definition.isDefinition(node)) {
        // A definition must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        if (normalizeOrderedChildren(
            editor,
            [node, path],
            [
                DefinitionTerm.isDefinitionTerm,
                (n): boolean => Meaning.isMeaning(n)
                    || DefinitionExample.isDefinitionExample(n),
                SeeAlso.isSeeAlso,
            ],
            normalizeInvalidChild,
        )) {
            return true
        }

        // Definition must have a term.
        if (!DefinitionTerm.isDefinitionTerm(node.children[0])) {
            const [prev] = Editor.previous(editor, { at: path }) ?? []
            if (Definition.isDefinition(prev)) {
                Transforms.mergeNodes(editor, { at: path })
            } else {
                Transforms.insertNodes(editor, {
                    type: 'definition_term',
                    children: [],
                }, { at: [...path, 0] })
            }
            return true
        }
    }

    // A glossary definition's content.
    if (Meaning.isMeaning(node) || SeeAlso.isSeeAlso(node)
    || DefinitionExample.isDefinitionExample(node)) {
        // Meaning, see-also, and example sections must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // Meaning, see-also, and example section make no sense outside a
        // glossary definition.
        const [parent] = Editor.parent(editor, path)
        if (!Definition.isDefinition(parent)) {
            // First try finding a definition into which we can wrap this
            // element into, or a group of elements from which we can build
            // a new definition.
            const [prev, prevPath] = previousOverOnly(editor, {
                at: path,
                match: n => (Definition.isDefinition(n) && !SeeAlso.isSeeAlso(n.children[n.children.length - 1]))
                    || DefinitionTerm.isDefinitionTerm(n),
                over: n => Meaning.isMeaning(n)
                    || DefinitionExample.isDefinitionExample(n),
            }) ?? []

            // There is a definition into which we can fold this node.
            if (Definition.isDefinition(prev)) {
                Transforms.moveNodes(editor, {
                    at: Editor.range(editor, Path.next(prevPath!), path),
                    to: [...prevPath!, prev.children.length],
                })
                return true
            }

            // There is a sequence of consecutive nodes (including this one)
            // which can form a proper definition.
            if (DefinitionTerm.isDefinitionTerm(prev)) {
                Transforms.wrapNodes(editor, {
                    type: 'definition',
                    children: [],
                }, {
                    at: Editor.range(editor, prevPath!, path),
                })
                return true
            }

            // Inside glossary the only remaining thing we can do is wrap this
            // node in a definition. This definition won't be correct, but
            // normalizations will fix that later.
            if (Glossary.isGlossary(parent)) {
                Transforms.wrapNodes(editor, {
                    type: 'definition',
                    children: [],
                }, { at: path })
                return true
            }

            // Otherwise (in the document) we can just unwrap this node.
            Transforms.unwrapNodes(editor, { at: path })
            return true
        }
    }

    if (DefinitionTerm.isDefinitionTerm(node)) {
        const [parent] = Editor.parent(editor, path)
        if (!Definition.isDefinition(parent) && !SeeAlso.isSeeAlso(parent)) {
            Transforms.wrapNodes(editor, {
                type: 'definition',
                children: [],
            }, { at: path })
            return true
        }
    }

    // A see-also section of a glossary definition.
    if (SeeAlso.isSeeAlso(node)) {
        // A see-also section may only contain terms.
        for (const [child, childPath] of Node.children(editor, path)) {
            if (!Term.isTerm(child)) {
                Transforms.setNodes(
                    editor, { type: 'definition_term' }, { at: childPath })
                return true
            }
        }
    }

    return false
}

function normalizeInvalidChild(editor: Editor, entry: NodeEntry, parent: Definition): void {
    const [, path] = entry
    const index = path.pop()!

    const prev = parent.children[index - 1]

    // There can be no content before the term. The only thing that can be done
    // is to remove it from the definition.
    if (index === 0 || SeeAlso.isSeeAlso(prev)) {
        Transforms.liftNodes(editor, { at: [...path, index] })
        return
    }

    // If the previous node is a meaning, fold the invalid node into it.
    if (Meaning.isMeaning(prev) || DefinitionExample.isDefinitionExample(prev)) {
        Transforms.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index - 1, prev.children.length],
        })
        return
    }

    // If the next node is a meaning, fold the invalid node into it.
    const next = parent.children[index + 1]
    if (Meaning.isMeaning(next) || DefinitionExample.isDefinitionExample(prev)) {
        Transforms.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index + 1, 0],
        })
        return
    }

    // Otherwise wrap the invalid node in a new meaning.
    Transforms.wrapNodes(editor, {
        type: 'definition_meaning',
        children: [],
    }, { at: [...path, index] })
}
