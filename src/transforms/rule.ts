// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Location, Node, Path, Range, Text, Transforms } from 'slate'

import { Proof, Rule, RuleExample, RuleKind, Section, Statement } from '../interfaces'

/**
 * Create a new exercise and wrap currently selected block in it
 *
 * This function is similar to Slate's Transforms.wrapNodes, but it won't split
 * line elements.
 */
export function insertRule(
    editor: Editor,
    kind?: RuleKind,
    options: {
        at?: Location,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options

        if (at == null) return

        let [startPoint, endPoint] = Range.edges(Editor.range(editor, at))

        // Find lowest non-inline nodes containing start and end points.
        const [, startPath] = Editor.above(editor, {
            at: startPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        })!
        const [, endPath] = Editor.above(editor, {
            at: endPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        })!

        // If both points are in the same node we can defer to Slate's wrapNodes.
        // Otherwise we need to do this manually, as wrapNodes with split: true
        // doesn't work when match points at the editor.
        if (Path.equals(startPath, endPath)) {
            Transforms.wrapNodes(editor, {
                type: 'rule',
                kind: kind ?? 'rule',
                children: [],
            }, { at: startPath })
            return
        }

        // Move start and end points to the extremes, so that splits and moves
        // will correctly move whole line elements.
        startPoint = Editor.start(editor, startPath)
        endPoint = Editor.end(editor, endPath)

        const rangeRef = Editor.rangeRef(editor, Editor.range(editor, startPoint, endPoint))

        // Find lowest common parent of start and end points, which is also
        // a structural element.
        const [[parent, parentPath]] = Editor.levels(editor, {
            at: Path.common(startPath, endPath),
            match: n => Section.isSection(n) || Editor.isEditor(n),
        })

        Transforms.splitNodes(editor, { at: endPoint, match: n => n === parent })
        Transforms.splitNodes(editor, { at: startPoint, match: n => n === parent })

        const newIndex = Path.relative(Range.start(rangeRef.current!).path, parentPath)[0]
        const newPath = [...parentPath, newIndex]

        Transforms.insertNodes(editor, {
            type: 'rule',
            kind: kind ?? 'rule',
            children: [
                {
                    type: 'rule_statement',
                    children: [],
                },
            ],
        }, { at: newPath })

        Transforms.moveNodes(editor, {
            at: rangeRef.unref()!,
            to: [...newPath, 0, 0],
            mode: 'highest',
        })
    })
}

/**
 * Insert a new child into a rule
 *
 * The new child will be inserted at a position where there is already a child
 * matched by within, but not before any children matched by after. If there are
 * multiple such positions, the closest to currently selected child will be
 * used.
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new child.
 */
function insertInRule(
    editor: Editor,
    element: Omit<Statement | Proof | RuleExample, 'children'>,
    options: {
        at?: Location,
        after?: (n: Node) => boolean,
        within: (n: Node) => boolean,
        select?: boolean,
    },
): void {
    Editor.withoutNormalizing(editor, () => {
        const {
            at = editor.selection,
            after = (): boolean => false,
            within,
            select,
        } = options

        if (at == null) return

        const atPath = Editor.path(editor, at)

        const [[rule, rulePath]] = Editor.levels(editor, {
            at: atPath,
            match: Rule.isRule,
        })

        if (rule == null) return

        const index = Path.relative(atPath, rulePath)[0]
        let newIndex

        if (within(rule.children[index])) {
            newIndex = index + 1
        } else {
            for (newIndex = rule.children.length - 1 ; ; --newIndex) {
                const item = rule.children[newIndex]

                if (within(item) || after(item)) {
                    break
                }
            }
            newIndex += 1
        }

        Transforms.insertNodes(editor, {
            ...element,
            children: [
                {
                    type: 'paragraph',
                    children: [{ text: "" }],
                },
            ],
        }, { at: [...rulePath, newIndex], select })
    })
}

/**
 * Insert a new statement into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * statement.
 */
export function insertStatement(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    insertInRule(editor, { type: 'rule_statement' }, {
        ...options,
        within: Statement.isStatement,
    })
}

/**
 * Insert a new proof into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new proof.
 */
export function insertProof(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    insertInRule(editor, { type: 'rule_proof' }, {
        ...options,
        after: Statement.isStatement,
        within: Proof.isProof,
    })
}

/**
 * Insert a new example into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * example.
 */
export function insertRuleExample(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    insertInRule(editor, { type: 'rule_example' }, {
        ...options,
        after: n => Proof.isProof(n) || Statement.isStatement(n),
        within: RuleExample.isRuleExample,
    })
}
