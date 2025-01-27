import { Element, Text, Editor, Range, Transforms as Transforms$1, Path, Node } from 'slate';
import { List as List$1, ListItem } from 'slate-lists';
export { ListItem } from 'slate-lists';

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Code = {
    /** Check if value of unknown type is a piece of code */
    isCode(value) {
        return Element.isElement(value) && value.type === 'code';
    },
    /** Check if value of unknown type is a block of code */
    isCodeBlock(value) {
        return Code.isCode(value) && value.placement === 'block';
    },
    /** Check if value of unknown type is a line of code */
    isCodeLine(value) {
        return Code.isCode(value) && value.placement === 'line';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Glossary = {
    /** Check if value of unknown type is a glossary */
    isGlossary(value) {
        return Element.isElement(value) && value.type === 'glossary';
    },
};
const Term = {
    /** Check if value of unknown type is a term */
    isTerm(value) {
        return Element.isElement(value) && value.type === 'term';
    },
    isNameTerm(value) {
        return Term.isTerm(value) && value.index === 'name';
    },
};
const Definition = {
    /** Check if value of unknown type is a definition */
    isDefinition(value) {
        return Element.isElement(value) && value.type === 'definition';
    },
};
const DefinitionTerm = {
    /** Check if value of unknown type is a term of a definition */
    isDefinitionTerm(value) {
        return Element.isElement(value) && value.type === 'definition_term';
    },
};
const Meaning = {
    /** Check if value of unknown type is a meaning of a definition */
    isMeaning(value) {
        return Element.isElement(value) && value.type === 'definition_meaning';
    },
};
const DefinitionExample = {
    /** Check if value of unknown type is an example usage of a definition */
    isDefinitionExample(value) {
        return Element.isElement(value) && value.type === 'definition_example';
    },
};
const SeeAlso = {
    /**
     * Check if value of unknown type is a reference to other related
     * definitions
     */
    isSeeAlso(value) {
        return Element.isElement(value) && value.type === 'definition_seealso';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Media = {
    /** Check if value of unknown type is a collection of media elements */
    isMedia(value) {
        return Element.isElement(value) && value.type === 'media';
    },
};
const AltText = {
    /**
     * Check if value of unknown type is a textual description of a media
     * collection
     */
    isAltText(value) {
        return Element.isElement(value) && value.type === 'media_alt';
    },
};
const MediaData = {
    /** Check if value of unknown type contains media data */
    isMediaData(value) {
        return typeof value === 'object'
            && typeof value.src === 'string'
            && MediaUse.isMediaUse(value.intendedUse);
    },
};
const MediaUse = {
    /** Check if value of unknown type is a valid usage of a media item */
    isMediaUse(value) {
        return typeof value === 'string'
            && (value === 'all' || value === 'pdf' || value === 'online');
    },
};
const Audio = {
    /** Check if value of unknown type is an audio element */
    isAudio(value) {
        return Element.isElement(value) && value.type === 'media_audio';
    },
};
const Image = {
    /** Check if value of unknown type is an image element */
    isImage(value) {
        return Element.isElement(value) && value.type === 'media_image';
    },
};
const Video = {
    /** Check if value of unknown type is a video element */
    isVideo(value) {
        return Element.isElement(value) && value.type === 'media_video';
    },
};

const ProcessingInstruction = {
    /** Check if value of unknown type is a processing instruction element */
    isProcessingInstruction(value) {
        return Element.isElement(value) && value.type === 'processing_instruction';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Paragraph = {
    /** Check if value of unknown type is a paragraph */
    isParagraph(value) {
        return Element.isElement(value) && value.type === 'paragraph';
    },
};
const Caption = {
    /** Check if value of unknown type is a caption */
    isCaption(value) {
        return Element.isElement(value) && value.type === 'caption';
    },
};
const Quotation = {
    /** Check if value of unknown type is a quotation */
    isQuotation(value) {
        return Element.isElement(value) && value.type === 'quotation';
    },
};
const Title = {
    /** Check if value of unknown type is a title */
    isTitle(value) {
        return Element.isElement(value) && value.type === 'title';
    },
};
const Foreign = {
    /** Check if value of unknown type is a foreign text */
    isForeign(value) {
        return Element.isElement(value) && value.type === 'foreign';
    },
};
const Footnote = {
    /** Check if value of unknown type is a footnote */
    isFootnote(value) {
        return Element.isElement(value) && value.type === 'footnote';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const CrossReference = {
    /** Check if value of unknown type is a cross-reference */
    isCrossReference(value) {
        return Element.isElement(value) && value.type === 'xref';
    },
    /** Check if value of unknown type is a valid grammatical case */
    isCase(value) {
        return CASES.includes(value);
    },
};
const DocumentReference = {
    /** Check if value of unknown type is a reference to another document */
    isDocumentReference(value) {
        return Element.isElement(value) && value.type === 'docref';
    },
};
const Link = {
    /** Check if value of unknown type is a hyperlink */
    isLink(value) {
        return Element.isElement(value) && value.type === 'link';
    },
};
const _CASES = [
    "abessive",
    "ablative",
    "ablative",
    "absolutive",
    "accusative",
    "accusative",
    "adessive",
    "adverbial",
    "agentive",
    "allative",
    "antessive",
    "apudessive",
    "aversive",
    "benefactive",
    "causal",
    "causal-final",
    "comitative",
    "comparative",
    "dative",
    "delative",
    "distributive",
    "egressive",
    "elative",
    "equative",
    "ergative",
    "ergative-genitive",
    "essive",
    "essive",
    "essive-formal",
    "essive-modal",
    "exessive",
    "formal",
    "genitive",
    "identical",
    "illative",
    "inessive",
    "initiative",
    "instructive",
    "instrumental",
    "instrumental-comitative",
    "intransitive",
    "intrative",
    "lative",
    "locative",
    "nominative",
    "objective",
    "oblique",
    "orientative",
    "ornative",
    "partitive",
    "pegative",
    "perlative",
    "pertingent",
    "possessed",
    "possessive",
    "postessive",
    "prepositional",
    "privative",
    "prolative",
    "revertive",
    "semblative",
    "sociative",
    "subessive",
    "sublative",
    "superssive",
    "temporal",
    "terminative",
    "translative",
    "vocative",
];
/** List of all supported grammatical cases */
const CASES = _CASES;

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const ADMONITION_KINDS = ["note", "warning", "tip", "important"];
const Admonition = {
    /** Check if value of unknown type is an admonition */
    isAdmonition(value) {
        return Element.isElement(value) && value.type === 'admonition';
    },
    /** Check if value of unknown type is an admonition kind */
    isAdmonitionKind(value) {
        return ADMONITION_KINDS.includes(value);
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const r = new Uint8Array(16);
function s(start, end) {
    return Array.from(r.subarray(start, end), x => x.toString(16).padStart(2, '0')).join('');
}
function v4() {
    window.crypto.getRandomValues(r);
    r[6] = 0x40 | (r[6] & 0x0f);
    r[8] = 0x40 | (r[8] & 0x3f);
    return `${s(0, 4)}-${s(4, 6)}-${s(6, 8)}-${s(8, 10)}-${s(10, 16)}`;
}

var uuid = /*#__PURE__*/Object.freeze({
    __proto__: null,
    v4: v4
});

// Copyright 2023 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Deep clone a node */
function cloneNode(node) {
    return Text.isText(node)
        ? { ...node }
        : {
            ...node,
            children: node.children.map(cloneNode),
        };
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Given a sorted array return its copy with duplicates removed */
function dedup(array) {
    return array.filter((value, inx, arr) => inx === 0 || value !== arr[inx - 1]);
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Yield items of an iterable together with their indices */
function* enumerate(iter, reverse) {
    if (reverse) {
        if (Array.isArray(iter)) {
            for (let index = iter.length - 1; index >= 0; --index) {
                yield [index, iter[index]];
            }
        }
        else {
            yield* enumerate(Array.from(iter), true);
        }
        return;
    }
    let index = 0;
    for (const value of iter) {
        yield [index++, value];
    }
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
function unpackBlocks(editor, fragment) {
    function* unpack(nodes) {
        for (const node of nodes) {
            if (Editor.isBlock(editor, node)) {
                yield* unpack(node.children);
            }
            else {
                yield cloneNode(node);
            }
        }
    }
    return Array.from(unpack(fragment));
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const WHITESPACE = /[ \t\n]+/;
const WithClasses = {
    /** Check if value of unknown type has classes */
    hasClasses(value) {
        return typeof value === 'object'
            && Array.isArray(value.classes)
            && typeof value.classes[0] === 'string';
    },
    /** Verify that a string is a valid class. */
    isValidClass(value) {
        return value.match(WHITESPACE) == null;
    },
    /** Iterate over all valid classes in a string */
    *splitClasses(str) {
        yield* str.trim().split(WHITESPACE);
    },
    /** Normalize an array of classes, returning a new array */
    normalizeClasses(classes) {
        const result = [];
        for (const cls of classes) {
            result.push(...WithClasses.splitClasses(cls));
        }
        return dedup(result.sort((a, b) => a.localeCompare(b)));
    },
};

// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Equation = {
    isEquation(value) {
        return Element.isElement(value) && value.type === 'equation';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Exercise = {
    /** Check if value of unknown type is an exercise */
    isExercise(value) {
        return Element.isElement(value) && value.type === 'exercise';
    },
};
const Problem = {
    /** Check if value of unknown type is a problem statement of an exercise */
    isProblem(value) {
        return Element.isElement(value) && value.type === 'exercise_problem';
    },
};
const Solution = {
    /** Check if value of unknown type is a solution of an exercise */
    isSolution(value) {
        return Element.isElement(value) && value.type === 'exercise_solution';
    },
};
const Commentary = {
    /** Check if value of unknown type is a commentary to an exercise*/
    isCommentary(value) {
        return Element.isElement(value) && value.type === 'exercise_commentary';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Figure = {
    /** Check if value of unknown type is a figure */
    isFigure(value) {
        return Element.isElement(value) && value.type === 'figure';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const List = {
    isList(value) {
        return List$1.isList(value);
    },
};
const BulletedList = {
    /** Check if value of unknown type is a bulleted list */
    isBulletedList(value) {
        return List.isList(value) && value.style === 'bulleted';
    },
};
const EnumeratedList = {
    /** Check if value of unknown type is an enumerated list */
    isEnumeratedList(value) {
        return List.isList(value) && value.style === 'enumerated';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Preformat = {
    /** Check if value of unknown type is a pre-formatted block */
    isPreformat(value) {
        return Element.isElement(value) && value.type === 'preformat';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const RULE_KINDS = ['rule', 'theorem', 'lemma', 'corollary', 'law', 'proposition'];
const Rule = {
    /** Check if value of unknown type is a rule */
    isRule(value) {
        return Element.isElement(value) && value.type === 'rule';
    },
    /** Check if value of unknown type is a kind of rule */
    isRuleKind(value) {
        return RULE_KINDS.includes(value);
    },
};
const Statement = {
    /** Check if value of unknown type is a statement of a rule */
    isStatement(value) {
        return Element.isElement(value) && value.type === 'rule_statement';
    },
};
const Proof = {
    /** Check if value of unknown type is a proof of a rule */
    isProof(value) {
        return Element.isElement(value) && value.type === 'rule_proof';
    },
};
const RuleExample = {
    /** Check if value of unknown type is an example usage of a rule */
    isRuleExample(value) {
        return Element.isElement(value) && value.type === 'rule_example';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Section = {
    /** Check if value of unknown type is a section */
    isSection(value) {
        return Element.isElement(value) && value.type === 'section';
    },
};

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Check if an element is an inline element according to this schema */
function isInline(element) {
    return Code.isCodeLine(element)
        || CrossReference.isCrossReference(element)
        || DocumentReference.isDocumentReference(element)
        || Footnote.isFootnote(element)
        || Foreign.isForeign(element)
        || Link.isLink(element)
        || Term.isTerm(element);
}
/** Check if an element is a void element according to this schema */
function isVoid(element) {
    return Audio.isAudio(element)
        || CrossReference.isCrossReference(element)
        || DocumentReference.isDocumentReference(element)
        || Image.isImage(element)
        || ProcessingInstruction.isProcessingInstruction(element)
        || Video.isVideo(element);
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Handle a keydown event
 *
 * If the event is handled this function will call preventDefault on it.
 */
function onKeyDown(editor, ev) {
    switch (ev.key) {
        case 'Backspace': return onBackspace(editor, ev);
        case 'Enter': return onEnter(editor, ev);
    }
}
function isCodeLike(value) {
    return Code.isCodeBlock(value) || Preformat.isPreformat(value);
}
function isTextNel(value) {
    return Text.isText(value) && value.text.includes('\n');
}
/** Handle backspace */
function onBackspace(editor, ev) {
    var _a, _b, _c, _d;
    const { selection } = editor;
    // Only consider actual, non-collapsed selection.
    if (selection == null || !Range.isCollapsed(selection)) {
        return;
    }
    const [admonition, admonitionPath] = (_a = Editor.above(editor, { match: Admonition.isAdmonition })) !== null && _a !== void 0 ? _a : [];
    if (admonition != null && admonitionPath != null) {
        // Backspace at the beginning of an admonition, first element of the list
        if (selection.anchor.offset > 0)
            return;
        const [, listPath] 
        // eslint-disable-next-line @typescript-eslint/unbound-method
        = (_b = Editor.above(editor, { match: ListItem.isListItem })) !== null && _b !== void 0 ? _b : [];
        if (listPath != null) {
            const pointBefore = Editor.before(editor, selection, { unit: 'character' });
            if (pointBefore && Editor.above(editor, { at: pointBefore.path, match: ListItem.isListItem }))
                return;
            Transforms$1.liftNodes(editor, { at: listPath });
            return ev.preventDefault();
        }
        return;
    }
    const [code, codePath] = (_c = Editor.above(editor, { match: isCodeLike })) !== null && _c !== void 0 ? _c : [];
    if (code != null) {
        // Backspace not at the end will only remove one character, which is
        // exactly what we want.
        if (selection.anchor.offset > 0) {
            return;
        }
        // Otherwise backspace will merge the code/preformat with the previous
        // element, which is OK unless there are line breaks, ...
        const [entry] = Editor.nodes(editor, {
            at: codePath,
            match: isTextNel,
        });
        const [nel, path] = entry || [];
        if (nel == null) {
            return;
        }
        const offset = nel.text.indexOf('\n');
        const point = { path, offset };
        // ... in which case we first split the code/preformat on the first line
        // break and then the default behaviour is again what we want.
        Transforms$1.delete(editor, { at: point });
        Transforms$1.splitNodes(editor, { at: point });
    }
    const [alt] = (_d = Editor.above(editor, { match: AltText.isAltText })) !== null && _d !== void 0 ? _d : [];
    if (alt != null) {
        if (selection.anchor.offset > 0)
            return;
        // Backspace at the beginning of an alt-text. Slate's default handling
        // would try merging it with the preceding node, which in this case is
        // the void MediaData.
        return ev.preventDefault();
    }
}
/** Handle enter/paragraph break */
function onEnter(editor, ev) {
    var _a;
    const { selection } = editor;
    if (selection == null) {
        return;
    }
    // Non-null assertion is valid because there must be at least one block
    // between the text node containing the cursor and the editor itself.
    const [block, blockPath] = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
    });
    if (Title.isTitle(block)) {
        Editor.withoutNormalizing(editor, () => {
            var _a;
            if (Editor.point(editor, blockPath, { edge: 'end' }).offset
                !== ((_a = editor.selection) === null || _a === void 0 ? void 0 : _a.focus.offset)) {
                Transforms$1.splitNodes(editor);
                Transforms$1.setNodes(editor, { type: 'paragraph' }, { at: Path.next(blockPath) });
            }
            else {
                Transforms$1.insertNodes(editor, {
                    type: 'paragraph',
                    children: [
                        { text: '' },
                    ],
                });
            }
        });
        return ev.preventDefault();
    }
    if (isCodeLike(block)) {
        Editor.withoutNormalizing(editor, () => {
            if (!Range.isCollapsed(selection)) {
                Editor.deleteFragment(editor);
            }
            Editor.insertText(editor, '\n');
            if (!ev.shiftKey) {
                if (Node.string(Editor.node(editor, selection)[0]).endsWith('\n\n')) {
                    Transforms$1.delete(editor, { distance: 2, unit: 'character', reverse: true });
                    Transforms$1.insertNodes(editor, {
                        type: 'paragraph',
                        children: [
                            { text: '' },
                        ],
                    });
                }
                else if (selection.anchor.path[selection.anchor.path.length - 1] === 0
                    && selection.anchor.offset === 0) {
                    Transforms$1.removeNodes(editor, { at: blockPath });
                    Transforms$1.move(editor, { distance: 1, unit: 'character' });
                }
            }
        });
        return ev.preventDefault();
    }
    if (Caption.isCaption(block)) {
        Editor.withoutNormalizing(editor, () => {
            if (!Range.isCollapsed(selection)) {
                Editor.deleteFragment(editor);
            }
            Transforms$1.splitNodes(editor, { always: true });
            Transforms$1.liftNodes(editor, { at: Path.next(blockPath) });
        });
        return ev.preventDefault();
    }
    if (AltText.isAltText(block) && Range.isCollapsed(selection)) {
        const after = Editor.after(editor, blockPath);
        if (!after)
            return;
        const newSelection = {
            anchor: {
                path: after.path,
                offset: 0,
            },
            focus: {
                path: after.path,
                offset: 0,
            },
        };
        Transforms$1.setSelection(editor, newSelection);
        if (!Editor.above(editor, { match: Caption.isCaption })) {
            Transforms$1.insertNodes(editor, {
                type: 'paragraph',
                children: [
                    { text: '' },
                ],
            });
        }
        return ev.preventDefault();
    }
    // Shift disables special handling
    if (ev.shiftKey) {
        return;
    }
    if (Range.isCollapsed(selection)) {
        // Since selection is collapsed it can only be within a single node.
        const path = selection.anchor.path;
        // Only handle key if selection is in an empty block, or at a beginning
        // of a block.
        if (path[path.length - 1] !== 0 || selection.anchor.offset > 0) {
            return;
        }
        const [container, containerPath] = (_a = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
            at: blockPath,
        })) !== null && _a !== void 0 ? _a : [];
        if (Admonition.isAdmonition(container) || Quotation.isQuotation(container)) {
            Transforms$1.unwrapNodes(editor, {
                at: path,
                match: n => n === container,
                split: true,
            });
            return ev.preventDefault();
        }
        if (Problem.isProblem(container) || Solution.isSolution(container)
            || Commentary.isCommentary(container)) {
            const exercise = Node.parent(editor, containerPath);
            const exercisePath = Path.parent(containerPath);
            const itemIndex = containerPath[containerPath.length - 1];
            const blockIndex = blockPath[blockPath.length - 1];
            // First element of the item; splitting here would create an empty
            // item, ...
            if (blockIndex === 0) {
                // ... but since this is the last item we can just unwrap it.
                if (itemIndex + 1 === exercise.children.length) {
                    Transforms$1.liftNodes(editor, { at: containerPath });
                }
                // Otherwise we prevent any action.
                return ev.preventDefault();
            }
            // Since commentaries are always last, the only reasonable thing to
            // do is unwrap content following cursor from the exercise.
            if (Commentary.isCommentary(container)) {
                Transforms$1.moveNodes(editor, {
                    at: Editor.range(editor, path, containerPath),
                    to: Path.next(exercisePath),
                });
                return ev.preventDefault();
            }
            // Otherwise split current block.
            Editor.withoutNormalizing(editor, () => {
                Transforms$1.splitNodes(editor, { at: [...containerPath, blockIndex] });
                // When splitting a problem this way we want to create
                // a solution instead.
                if (Problem.isProblem(container)) {
                    Transforms$1.setNodes(editor, { type: 'exercise_solution' }, { at: Path.next(containerPath) });
                }
            });
            return ev.preventDefault();
        }
        if (Meaning.isMeaning(container) || DefinitionExample.isDefinitionExample(container)) {
            Editor.withoutNormalizing(editor, () => {
                Transforms$1.splitNodes(editor, { at: blockPath });
                // When splitting an example we want to create a meaning instead
                if (DefinitionExample.isDefinitionExample(container)) {
                    Transforms$1.setNodes(editor, { type: 'definition_meaning' }, { at: Path.next(containerPath) });
                }
            });
            return ev.preventDefault();
        }
        if (Statement.isStatement(container)
            || Proof.isProof(container)
            || RuleExample.isRuleExample(container)) {
            const [rule] = Editor.above(editor, { at: containerPath, match: Rule.isRule });
            const itemIndex = containerPath[containerPath.length - 1];
            const blockIndex = blockPath[blockPath.length - 1];
            // First element of the item; splitting here would create an empty
            // item, ...
            if (blockIndex === 0) {
                // ... but since this is the last item we can just unwrap it.
                if (itemIndex + 1 === rule.children.length) {
                    Transforms$1.liftNodes(editor, { at: containerPath });
                }
                // Otherwise we prevent any action.
                return ev.preventDefault();
            }
            // Otherwise split current block.
            Transforms$1.splitNodes(editor, { at: [...containerPath, blockIndex] });
            return ev.preventDefault();
        }
    }
}

/** Set of all IDs currently present in an editor */
const ID_MAP = new WeakMap();
const IdEditor = {
    /**
     * Invalidate ID cache
     *
     * This function must be called each time `editor.children` are manually
     * updated. It will invalidate the internal ID cache, ensuring it is rebuilt
     * the next time it is needed.
     */
    invalidateIDs(editor) {
        ID_MAP.delete(editor);
    },
};
/**
 * Augment an editor with an ID manager
 *
 * The ID manager will ensure that each {@link Element} has a document-unique
 * property {@code id: string}.
 */
function withIds(editor) {
    const ed = editor;
    const { apply: oldApply } = ed;
    ed.generateID = generateID;
    ed.apply = apply.bind(null, oldApply, ed);
    return ed;
}
function apply(apply, ed, op) {
    let ids = ID_MAP.get(ed);
    if (ids == null) {
        ID_MAP.set(ed, ids = collectIds(ed));
    }
    const add = [];
    const remove = [];
    switch (op.type) {
        case 'insert_node':
            walk(op.node, el => {
                if (!('id' in el) || typeof el.id !== 'string' || ids.has(el.id)) {
                    el.id = ed.generateID();
                }
                add.push(el.id);
            });
            break;
        case 'merge_node':
            if ('id' in op.properties && typeof op.properties.id === 'string') {
                remove.push(op.properties.id);
            }
            break;
        case 'remove_node':
            walk(op.node, el => {
                if ('id' in el && typeof el.id === 'string') {
                    remove.push(el.id);
                }
            });
            break;
        case 'set_node':
            if ('id' in op.properties && typeof op.properties.id === 'string') {
                remove.push(op.properties.id);
            }
            if ('id' in op.newProperties) {
                if (typeof op.newProperties.id !== 'string') {
                    /* eslint-disable-next-line
                        @typescript-eslint/restrict-template-expressions */
                    throw new Error(`${op.newProperties.id} is not a valid ID`);
                }
                if (ids.has(op.newProperties.id)) {
                    throw new Error(`a node with ID ${op.newProperties.id} already exists`);
                }
                add.push(op.properties.id);
            }
            break;
        case 'split_node':
            if ('id' in op.properties) {
                op.properties.id = ed.generateID();
                add.push(op.properties.id);
            }
            break;
    }
    apply(op);
    for (const id of remove) {
        ids.delete(id);
    }
    for (const id of add) {
        ids.add(id);
    }
}
/** Generate a new, random ID */
function generateID() {
    return `UUID${v4()}`;
}
function walk(node, callback) {
    if (Element.isElement(node)) {
        callback(node);
        for (const child of node.children)
            walk(child, callback);
    }
}
function collectIds(editor) {
    return new Set(Array.from(Editor.nodes(editor, {
        at: [[0], [editor.children.length]],
        match: node => Element.isElement(node) && 'id' in node && typeof node.id === 'string',
    }), ([node]) => node.id));
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize an admonition
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeAdmonition(editor, entry) {
    const [node, path] = entry;
    if (Admonition.isAdmonition(node)) {
        // Admonition's kind must be valid.
        if (!Admonition.isAdmonitionKind(node.kind)) {
            Transforms$1.setNodes(editor, { kind: 'note' }, { at: path });
            return true;
        }
    }
    return false;
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize classes of an element
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeClasses(editor, entry) {
    const [node, path] = entry;
    if (WithClasses.hasClasses(node)) {
        // List of classes must not be empty.
        if (node.classes.length === 0) {
            Transforms$1.unsetNodes(editor, 'classes', { at: path });
            return true;
        }
        // Each class must be valid.
        if (!node.classes.every(WithClasses.isValidClass)) {
            Transforms$1.setNodes(editor, {
                classes: WithClasses.normalizeClasses(node.classes),
            }, { at: path });
            return true;
        }
        // Classes must be sorted and contain no duplicates.
        if (!isSortedUnique(node.classes)) {
            Transforms$1.setNodes(editor, {
                classes: dedup(node.classes.sort()),
            }, { at: path });
            return false;
        }
    }
    return false;
}
/** Check whether an array is sorted and contains no duplicates */
function isSortedUnique(classes) {
    for (let i = 1; i < classes.length; ++i) {
        if (classes[i - 1] >= classes[i]) {
            return false;
        }
    }
    return true;
}

// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
function normalizeEquation(editor, entry) {
    const [node, path] = entry;
    if (Equation.isEquation(node)) {
        // Equations must not be empty
        if (node.children.length === 0) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Equations must only have a single child
        if (node.children.length > 1) {
            Transforms$1.splitNodes(editor, { at: [...path, node.children.length - 1] });
            return true;
        }
        // Equation can only contain elements from a predefined set and in
        // a strict order.
        if (!Element.isElement(node.children[0]) || !editor.isEquationContent(node.children[0])) {
            Transforms$1.unwrapNodes(editor, {
                at: [...path, 0],
                match: n => n === node,
            });
            return true;
        }
    }
    return false;
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Find children which are out of order and move them to correct places
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeOrderedChildren(editor, entry, groups, normalize) {
    var _a;
    const [node, path] = entry;
    // Iterator over groups.
    let inx = 0;
    // Current group (groups[inx]).
    let match = groups[0];
    // For each group, the last group successfully matched at that point.
    const lastMatch = [];
    for (const [index, child] of enumerate(node.children)) {
        // Skip all groups which don't match child.
        while (match != null && !match(child)) {
            match = groups[++inx];
        }
        if (match != null) {
            lastMatch[inx] = match;
            continue;
        }
        // Find the group matching this child.
        for (inx = 0; inx < groups.length; ++inx) {
            if (groups[inx](child)) {
                break;
            }
        }
        const childPath = [...path, index];
        // Child is not matched by any group.
        if (inx === groups.length) {
            normalize(editor, [child, childPath], node);
            return true;
        }
        const targetMatch = lastMatch[inx] || lastMatch[inx - 1] || (() => false);
        // Find child which should be directly before this one.
        const [, prevPath] = (_a = Editor.previous(editor, {
            at: childPath,
            match: n => node.children.includes(n) && targetMatch(n),
        })) !== null && _a !== void 0 ? _a : [];
        // Move the child to where it should be.
        if (prevPath == null) {
            Transforms$1.moveNodes(editor, {
                at: childPath,
                to: [...path, 0],
            });
        }
        else {
            prevPath[prevPath.length - 1] += 1;
            Transforms$1.moveNodes(editor, {
                at: childPath,
                to: prevPath,
            });
        }
        return true;
    }
    // All children are correctly ordered.
    return false;
}
/**
 * Find a previous sibling of node matching specified criteria, and stepping
 * only over siblings matching other criteria.
 */
function previousOverOnly(editor, options) {
    const { at, match, over } = options;
    const [parent, parentPath] = Editor.parent(editor, at);
    for (let index = at[at.length - 1] - 1; index >= 0; --index) {
        const child = parent.children[index];
        if (match(child)) {
            return [child, [...parentPath, index]];
        }
        if (!over(child)) {
            return;
        }
    }
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize an exercise or contents of an exercise
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeExercise(editor, entry) {
    const [node, path] = entry;
    // Problems, solutions, and commentaries make no sense outside an exercise.
    // Should it happen however, just replace it with its contents.
    if (Problem.isProblem(node) || Solution.isSolution(node)
        || Commentary.isCommentary(node)) {
        const [parent] = Editor.parent(editor, path);
        if (!Exercise.isExercise(parent)) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return true;
        }
    }
    if (Exercise.isExercise(node)) {
        // An exercise must not be empty.
        if (node.children.length === 0) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Exercise can only be a child of sections and the document, or of an admonition.
        const [parent, parentPath] = Editor.parent(editor, path);
        if ((!Admonition.isAdmonition(parent) && !Section.isSection(parent)) && parentPath.length > 0) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return true;
        }
        // Exercise can only contain elements from a predefined set and in
        // a strict order.
        if (normalizeOrderedChildren(editor, [node, path], [Problem.isProblem, Solution.isSolution, Commentary.isCommentary], normalizeInvalidChild$3)) {
            return true;
        }
        // Exercise must have a problem.
        if (!Problem.isProblem(node.children[0])) {
            Transforms$1.insertNodes(editor, {
                type: 'exercise_problem',
                children: [
                    { type: 'paragraph', children: [] },
                ],
            }, { at: [...path, 0] });
            return true;
        }
    }
    return false;
}
/** Normalize an invalid child */
function normalizeInvalidChild$3(editor, entry, parent) {
    const [, path] = entry;
    const index = path.pop();
    // If there are valid children before this one, fold it into the previous
    // child.
    if (index > 0) {
        const previous = parent.children[index - 1];
        Transforms$1.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index - 1, previous.children.length],
        });
        return;
    }
    // Note that at this point index is guaranteed to be zero.
    // Otherwise if the next child is a problem then fold this child into
    // the problem.
    if (parent.children.length > 1
        && Problem.isProblem(parent.children[1])) {
        Transforms$1.moveNodes(editor, {
            at: [...path, index],
            to: [...path, 1, 0],
        });
        return;
    }
    // Otherwise we wrap the first child in a problem.
    Transforms$1.wrapNodes(editor, {
        type: 'exercise_problem',
        children: [],
    }, { at: [...path, 0] });
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize a figure
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeFigure(editor, entry) {
    const [node, path] = entry;
    if (Figure.isFigure(node)) {
        // Figure can only be a child of
        // sections, admonitions, problems, the document,
        // and other figures.
        const [parent, parentPath] = Editor.parent(editor, path);
        if (!Section.isSection(parent)
            && !Figure.isFigure(parent)
            && !Admonition.isAdmonition(parent)
            && !Problem.isProblem(parent)
            && !Solution.isSolution(parent)
            && !ListItem.isListItem(parent)
            && parentPath.length > 0) {
            Transforms$1.liftNodes(editor, { at: path });
            return true;
        }
        // Nested figures can't contain subfigures.
        if (Figure.isFigure(parent) && node.children.some(Figure.isFigure)) {
            Transforms$1.unwrapNodes(editor, {
                at: path,
                match: n => n === node,
            });
            return true;
        }
        // Ensure children are ordered items then captions. At this point there
        // may still be multiple captions interspersed with items.
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, isFigureItem, Caption.isCaption], normalizeInvalidChild$2)) {
            return true;
        }
        // At this point there can only be one caption, and it can only be the
        // last child.
        const hasCaption = Caption.isCaption(node.children[node.children.length - 1]);
        const hasTitle = Title.isTitle(node.children[0]);
        const length = node.children.length - (hasCaption ? 1 : 0) - (hasTitle ? 1 : 0);
        // Figures must not be empty.
        if (length === 0) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // There must be more than one subfigure.
        if (length === 1 && Figure.isFigure(node.children[0])) {
            Transforms$1.unwrapNodes(editor, { at: [...path, 0] });
            return true;
        }
        // If there is more than one item, all must be subfigures.
        if (length > 1) {
            for (const [inx, child] of enumerate(node.children)) {
                if (Title.isTitle(child) || Figure.isFigure(child) || Caption.isCaption(child)) {
                    continue;
                }
                Transforms$1.wrapNodes(editor, {
                    type: 'figure',
                    children: [],
                }, { at: [...path, inx] });
                return true;
            }
        }
    }
    if (Media.isMedia(node)) {
        // Ensure children are ordered media items then alt text.
        if (normalizeOrderedChildren(editor, [node, path], [isMediaItem, AltText.isAltText], normalizeInvalidChild$2)) {
            return true;
        }
        const hasAltText = AltText.isAltText(node.children[node.children.length - 1]);
        const length = node.children.length - (hasAltText ? 1 : 0);
        // Media parent must be a figure
        const [parent] = Editor.parent(editor, path);
        if (!Figure.isFigure(parent)) {
            Transforms$1.wrapNodes(editor, { type: 'figure', children: [] }, { at: path });
            return true;
        }
        // Media elements must contain at least one media item.
        if (length < 1) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Media elements must contain alt text.
        if (!hasAltText) {
            Transforms$1.insertNodes(editor, {
                type: 'media_alt',
                children: [{ text: '' }],
            }, { at: [...path, node.children.length] });
            return true;
        }
    }
    if (isMediaItem(node)) {
        // Media item must be inside media
        const [parent] = Editor.parent(editor, path);
        if (!Media.isMedia(parent)) {
            Transforms$1.wrapNodes(editor, {
                type: 'media',
                children: [
                    node,
                    { type: 'media_alt', children: [{ text: '' }] },
                ],
            }, { at: path });
            return true;
        }
    }
    return false;
}
function isFigureItem(node) {
    return Figure.isFigure(node) || Media.isMedia(node);
}
function isMediaItem(node) {
    return Image.isImage(node) || Audio.isAudio(node) || Video.isVideo(node);
}
function normalizeInvalidChild$2(editor, entry) {
    const [node, path] = entry;
    if (Text.isText(node)) {
        Transforms$1.wrapNodes(editor, { type: 'paragraph', children: [] }, { at: path });
    }
    Transforms$1.liftNodes(editor, { at: path });
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize glossary
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeGlossary(editor, entry) {
    var _a, _b, _c;
    const [node, path] = entry;
    if (Glossary.isGlossary(node)) {
        // Glossary must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Glossary may only be a child of the document itself.
        if (path.length > 1) {
            Transforms$1.moveNodes(editor, {
                at: path,
                to: [editor.children.length],
            });
            return true;
        }
        // Glossary must be the last element.
        const [next, nextPath] = (_a = Editor.next(editor, { at: path })) !== null && _a !== void 0 ? _a : [];
        if (next != null) {
            if (Glossary.isGlossary(next)) {
                Transforms$1.mergeNodes(editor, { at: nextPath });
            }
            else {
                Transforms$1.moveNodes(editor, {
                    at: nextPath,
                    to: path,
                });
            }
            return true;
        }
    }
    // A glossary definition.
    if (Definition.isDefinition(node)) {
        // A definition must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        if (normalizeOrderedChildren(editor, [node, path], [
            DefinitionTerm.isDefinitionTerm,
            (n) => Meaning.isMeaning(n)
                || DefinitionExample.isDefinitionExample(n),
            SeeAlso.isSeeAlso,
        ], normalizeInvalidChild$1)) {
            return true;
        }
        // Definition must have a term.
        if (!DefinitionTerm.isDefinitionTerm(node.children[0])) {
            const [prev] = (_b = Editor.previous(editor, { at: path })) !== null && _b !== void 0 ? _b : [];
            if (Definition.isDefinition(prev)) {
                Transforms$1.mergeNodes(editor, { at: path });
            }
            else {
                Transforms$1.insertNodes(editor, {
                    type: 'definition_term',
                    children: [],
                }, { at: [...path, 0] });
            }
            return true;
        }
        // Only one term is allowed per definition
        if (DefinitionTerm.isDefinitionTerm(node.children[1])) {
            Transforms$1.mergeNodes(editor, { at: [...path, 1] });
            return true;
        }
    }
    // A glossary definition's content.
    if (Meaning.isMeaning(node) || SeeAlso.isSeeAlso(node)
        || DefinitionExample.isDefinitionExample(node)) {
        // Meaning, see-also, and example sections must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Meaning, see-also, and example section make no sense outside a
        // glossary definition.
        const [parent] = Editor.parent(editor, path);
        if (!Definition.isDefinition(parent)) {
            // First try finding a definition into which we can wrap this
            // element into, or a group of elements from which we can build
            // a new definition.
            const [prev, prevPath] = (_c = previousOverOnly(editor, {
                at: path,
                match: n => (Definition.isDefinition(n)
                    && !SeeAlso.isSeeAlso(n.children[n.children.length - 1]))
                    || DefinitionTerm.isDefinitionTerm(n),
                over: n => Meaning.isMeaning(n)
                    || DefinitionExample.isDefinitionExample(n),
            })) !== null && _c !== void 0 ? _c : [];
            // There is a definition into which we can fold this node.
            if (Definition.isDefinition(prev)) {
                Transforms$1.moveNodes(editor, {
                    at: Editor.range(editor, Path.next(prevPath), path),
                    to: [...prevPath, prev.children.length],
                });
                return true;
            }
            // There is a sequence of consecutive nodes (including this one)
            // which can form a proper definition.
            if (DefinitionTerm.isDefinitionTerm(prev)) {
                Transforms$1.wrapNodes(editor, {
                    type: 'definition',
                    children: [],
                }, {
                    at: Editor.range(editor, prevPath, path),
                });
                return true;
            }
            // Inside glossary the only remaining thing we can do is wrap this
            // node in a definition. This definition won't be correct, but
            // normalizations will fix that later.
            if (Glossary.isGlossary(parent)) {
                Transforms$1.wrapNodes(editor, {
                    type: 'definition',
                    children: [],
                }, { at: path });
                return true;
            }
            // Otherwise (in the document) we can just unwrap this node.
            Transforms$1.unwrapNodes(editor, { at: path });
            return true;
        }
    }
    if (DefinitionTerm.isDefinitionTerm(node)) {
        const [parent] = Editor.parent(editor, path);
        if (!Definition.isDefinition(parent) && !SeeAlso.isSeeAlso(parent)) {
            Transforms$1.wrapNodes(editor, {
                type: 'definition',
                children: [],
            }, { at: path });
            return true;
        }
    }
    // A see-also section of a glossary definition.
    if (SeeAlso.isSeeAlso(node)) {
        // A see-also section may only contain terms.
        for (const [child, childPath] of Node.children(editor, path)) {
            if (!Term.isTerm(child)) {
                Transforms$1.setNodes(editor, { type: 'definition_term' }, { at: childPath });
                return true;
            }
        }
    }
    return false;
}
function normalizeInvalidChild$1(editor, entry, parent) {
    const [, path] = entry;
    const index = path.pop();
    const prev = parent.children[index - 1];
    // There can be no content before the term. The only thing that can be done
    // is to remove it from the definition.
    if (index === 0 || SeeAlso.isSeeAlso(prev)) {
        Transforms$1.liftNodes(editor, { at: [...path, index] });
        return;
    }
    // If the previous node is a meaning, fold the invalid node into it.
    if (Meaning.isMeaning(prev) || DefinitionExample.isDefinitionExample(prev)) {
        Transforms$1.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index - 1, prev.children.length],
        });
        return;
    }
    // If the next node is a meaning, fold the invalid node into it.
    const next = parent.children[index + 1];
    if (Meaning.isMeaning(next) || DefinitionExample.isDefinitionExample(prev)) {
        Transforms$1.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index + 1, 0],
        });
        return;
    }
    // Otherwise wrap the invalid node in a new meaning.
    Transforms$1.wrapNodes(editor, {
        type: 'definition_meaning',
        children: [],
    }, { at: [...path, index] });
}

// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize an quotation
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeQuotation(editor, entry) {
    const [node, path] = entry;
    if (Quotation.isQuotation(node)) {
        // A quotation must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Unwrap nested quotation if it is not selected
        // and it's the only child of another quotation.
        if (node.children.length === 1
            && Quotation.isQuotation(node.children[0])
            && (editor.selection == null || !Range.includes(editor.selection, path))) {
            Transforms$1.unwrapNodes(editor, { at: [...path, 0] });
            return true;
        }
        // Quotations may contain only Titles, Paragraphs,
        // Lists and other Quotations
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, isQuotationChild], (editor, entry) => Transforms$1.liftNodes(editor, { at: entry[1] }))) {
            return true;
        }
    }
    return false;
}
function isQuotationChild(node) {
    return Paragraph.isParagraph(node) || List$1.isList(node) || Quotation.isQuotation(node);
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize an rule or contents of an rule
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeRule(editor, entry) {
    const [node, path] = entry;
    // A rule's content.
    if (Statement.isStatement(node) || Proof.isProof(node)
        || RuleExample.isRuleExample(node)) {
        // Statements, proofs, and examples make no sense outside a rule. Should
        // it happen however, just replace it with its contents.
        const [parent] = Editor.parent(editor, path);
        if (!Rule.isRule(parent)) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return true;
        }
    }
    if (Rule.isRule(node)) {
        // Rule's kind must be valid.
        if (!Rule.isRuleKind(node.kind)) {
            Transforms$1.setNodes(editor, { kind: 'rule' }, { at: path });
            return true;
        }
        // Rules must not be empty.
        if (node.children.length === 0) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Rule can only be a child of sections and the document.
        const [parent, parentPath] = Editor.parent(editor, path);
        if (!Section.isSection(parent) && parentPath.length > 0) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return true;
        }
        // Exercise can only contain elements from a predefined set and in
        // a strict order.
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, Statement.isStatement, Proof.isProof, RuleExample.isRuleExample], normalizeInvalidChild)) {
            return true;
        }
        // Rules must have a statement.
        const firstIndex = Title.isTitle(node.children[0]) ? 1 : 0;
        if (!Statement.isStatement(node.children[firstIndex])) {
            Transforms$1.insertNodes(editor, {
                type: 'rule_statement',
                children: [
                    { type: 'paragraph', children: [] },
                ],
            }, { at: [...path, firstIndex] });
            return true;
        }
    }
    return false;
}
/** Normalize an invalid child */
function normalizeInvalidChild(editor, entry, parent) {
    const [, path] = entry;
    const index = path.pop();
    // If there are valid children before this one, fold it into the previous
    // child.
    if (index > 0 && !Title.isTitle(parent.children[index - 1])) {
        const previous = parent.children[index - 1];
        Transforms$1.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index - 1, previous.children.length],
        });
        return;
    }
    // Note that at this point index is guaranteed to be either zero or one.
    // Otherwise if the next child is a statement then fold this child into
    // that statement.
    if (index + 1 < parent.children.length
        && Statement.isStatement(parent.children[index + 1])) {
        Transforms$1.moveNodes(editor, {
            at: [...path, index],
            to: [...path, index + 1, 0],
        });
        return;
    }
    // Otherwise we wrap the first child in a problem.
    Transforms$1.wrapNodes(editor, {
        type: 'rule_statement',
        children: [],
    }, { at: [...path, index] });
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize document structure
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeStructure(editor, entry) {
    var _a, _b;
    const [node, path] = entry;
    // The document.
    if (path.length === 0) {
        // Document must not be empty and must not start with a glossary.
        if (editor.children.length === 0 || Glossary.isGlossary(editor.children[0])) {
            Transforms$1.insertNodes(editor, {
                type: 'paragraph',
                children: [],
            }, { at: [0] });
            return true;
        }
        // If the document starts with a title,
        // the title must be wrapped in a section
        if (Title.isTitle(editor.children[0])) {
            Transforms$1.wrapNodes(editor, {
                type: 'section',
                children: [],
            }, { at: [0] });
            Transforms$1.moveNodes(editor, { at: [1], to: [0, 1] });
            return true;
        }
    }
    if (Section.isSection(node)) {
        // Sections must not be empty.
        if (node.children.length === 0) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // Sections must have a title.
        if (!Title.isTitle(node.children[0])) {
            const [prev] = (_a = Editor.previous(editor, { at: path })) !== null && _a !== void 0 ? _a : [];
            if (Section.isSection(prev)) {
                // If this is a subsequent section, merge content into the
                // previous section.
                Transforms$1.mergeNodes(editor, { at: path });
            }
            else {
                // Otherwise unwrap it into the parent section.
                Transforms$1.unwrapNodes(editor, { at: path });
            }
            return true;
        }
        // Section must have other elements than just a title.
        if (node.children.length === 1) {
            Transforms$1.insertNodes(editor, {
                type: 'paragraph',
                children: [],
            }, { at: [...path, 1] });
            return true;
        }
        // Section may only be followed by other sections and the glossary.
        const [next, nextPath] = (_b = Editor.next(editor, { at: path })) !== null && _b !== void 0 ? _b : [];
        if (next != null && !Section.isSection(next) && !Glossary.isGlossary(next)) {
            Transforms$1.moveNodes(editor, {
                at: nextPath,
                to: [...path, node.children.length],
            });
            return true;
        }
        // Sections may be children only of the document and other sections.
        const [parent, parentPath] = Editor.parent(editor, path);
        if (parentPath.length > 0 && !Section.isSection(parent)) {
            Transforms$1.liftNodes(editor, { at: path });
            return true;
        }
    }
    return false;
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize text nodes
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeText(editor, entry) {
    var _a, _b, _c;
    const [node, path] = entry;
    let container;
    if (Caption.isCaption(node)) {
        container = node;
        // Caption is only allowed as the last child of a figure.
        const [parent] = Editor.parent(editor, path);
        if (!Figure.isFigure(parent)) {
            Transforms$1.setNodes(editor, { type: 'paragraph' }, { at: path });
            return true;
        }
        // Figure must not have more than one caption.
        const [next, nextPath] = (_a = Editor.next(editor, { at: path })) !== null && _a !== void 0 ? _a : [];
        if (Caption.isCaption(next)) {
            Transforms$1.mergeNodes(editor, { at: nextPath });
            return true;
        }
    }
    if (AltText.isAltText(node)) {
        container = node;
        // Media must not have more than one alt text.
        const [next, nextPath] = (_b = Editor.next(editor, { at: path })) !== null && _b !== void 0 ? _b : [];
        if (AltText.isAltText(next)) {
            Transforms$1.mergeNodes(editor, { at: nextPath });
            return true;
        }
    }
    if (Title.isTitle(node)) {
        container = node;
        // Title shouldn't be followed by another title.
        const [prev] = (_c = Editor.previous(editor, { at: path })) !== null && _c !== void 0 ? _c : [];
        if (Title.isTitle(prev)) {
            Transforms$1.mergeNodes(editor, { at: path });
            return true;
        }
        const [parent] = Editor.parent(editor, path);
        // Titles in figures are normalized in figure.ts.
        if (Figure.isFigure(parent)) {
            return false;
        }
        if (path[path.length - 1] > 0) {
            Transforms$1.setNodes(editor, { type: 'paragraph' }, { at: path });
            return true;
        }
    }
    if (container != null && ensureTextOnly(editor, container, path)) {
        return true;
    }
    if (Quotation.isQuotation(node)) {
        // A quotation must not be empty.
        if (node.children.length === 0) {
            Transforms$1.removeNodes(editor, { at: path });
            return true;
        }
        // A quotation must have other elements than just a title.
        if (node.children.length === 1 && Title.isTitle(node.children[0])) {
            Transforms$1.insertNodes(editor, {
                type: 'paragraph',
                children: [],
            }, { at: [...path, 1] });
            return true;
        }
        // A quotation must not consist only of another quotation. This however
        // shouldn't apply while outer quotation is selected, as that would it
        // more difficult to create a quotation which begins with another
        // quotation.
        const [parent, parentPath] = Editor.parent(editor, path);
        if (Quotation.isQuotation(parent) && parent.children.length === 1
            && (editor.selection == null || !Range.includes(editor.selection, parentPath))) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return true;
        }
    }
    if (Term.isTerm(node)) {
        // Term containing only a foreign.
        if (node.children.length === 3
            && Text.isText(node.children[0]) && node.children[0].text === ''
            && Text.isText(node.children[2]) && node.children[2].text === ''
            && Foreign.isForeign(node.children[1])) {
            const foreign = node.children[1];
            Transforms$1.unwrapNodes(editor, { at: [...path, 1] });
            Transforms$1.wrapNodes(editor, { ...foreign, children: [] }, { at: path });
            return true;
        }
    }
    // It will be removed after implementation of
    // https://github.com/openstax-poland/adaptarr-backlog/issues/92
    if (Foreign.isForeign(node)) {
        // Set default foreign language
        if (!node.language) {
            Transforms$1.setNodes(editor, { language: 'en' }, { at: path });
            return true;
        }
    }
    // Remove empty inlines, but only if they are not selected.
    if (Editor.isInline(editor, node) && !Editor.isVoid(editor, node)
        && Editor.isEmpty(editor, node)) {
        // For now Slate does not support typing inside empty inlines
        // and in case of:
        // <inline><cursor/></inline>
        // Backspace
        // <cursor/><inline></inline>
        // inline will not be removed because it will not be normalized.
        // We want to support this check in the future when these examples
        // will behave properly.
        // && (editor.selection == null || !Range.includes(editor.selection, path))
        Transforms$1.removeNodes(editor, { at: path });
        return true;
    }
    // Move white space from beginning and end of inlines outside of them,
    // unless they are currently selected.
    if (Editor.isInline(editor, node) && !Code.isCodeLine(node)
        && (editor.selection == null || !Range.includes(editor.selection, path))) {
        let match;
        const first = node.children[0];
        if (first != null && Text.isText(first) && (match = first.text.match(/^\s+/u))) {
            Transforms$1.delete(editor, {
                at: {
                    path: [...path, 0],
                    offset: 0,
                },
                distance: match[0].length,
            });
            Transforms$1.insertNodes(editor, { text: match[0] }, { at: path });
            return true;
        }
        const last = node.children[node.children.length - 1];
        if (last != null && Text.isText(last) && (match = last.text.match(/\s+$/u))) {
            Transforms$1.delete(editor, {
                at: {
                    path: [...path, node.children.length - 1],
                    offset: match.index,
                },
                distance: match[0].length,
            });
            Transforms$1.insertNodes(editor, { text: match[0] }, { at: Path.next(path) });
            return true;
        }
    }
    return false;
}
function ensureTextOnly(editor, node, path) {
    for (let i = 0; i < node.children.length; ++i) {
        if (Editor.isBlock(editor, node.children[i])) {
            Transforms$1.unwrapNodes(editor, {
                at: [...path, i],
            });
            return true;
        }
    }
    return false;
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Normalize links and cross-references
 *
 * Return true if entry was normalized and false otherwise.
 */
function normalizeXref(editor, entry) {
    const [node, path] = entry;
    if (CrossReference.isCrossReference(node)
        || DocumentReference.isDocumentReference(node)) {
        if (node.case && !CrossReference.isCase(node.case)) {
            Transforms$1.unsetNodes(editor, 'case', { at: path });
            return true;
        }
    }
    return false;
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
function normalizeNode(normalizeNode, editor, entry) {
    if (normalizeAdmonition(editor, entry)
        || normalizeClasses(editor, entry)
        || normalizeEquation(editor, entry)
        || normalizeExercise(editor, entry)
        || normalizeFigure(editor, entry)
        || normalizeGlossary(editor, entry)
        || normalizeQuotation(editor, entry)
        || normalizeRule(editor, entry)
        || normalizeStructure(editor, entry)
        || normalizeText(editor, entry)
        || normalizeXref(editor, entry)) {
        return;
    }
    // Fall back to original normalizeNode.
    normalizeNode(entry);
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
function withCnx(editor) {
    const ed = editor;
    const { normalizeNode: oldNormalizeNode, isInline: oldIsInline, isVoid: oldIsVoid, } = ed;
    ed.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, ed);
    ed.isEquationContent = () => false;
    ed.isInline = (element) => isInline(element) || oldIsInline(element);
    ed.isVoid = (element) => isVoid(element) || oldIsVoid(element);
    return ed;
}

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Create a new exercise and wrap currently selected block in it
 *
 * This function is similar to Slate's Transforms.wrapNodes, but it won't split
 * line elements.
 */
function insertExercise(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options;
        if (at == null)
            return;
        let [startPoint, endPoint] = Range.edges(Editor.range(editor, at));
        // Find lowest non-inline nodes containing start and end points.
        const [, startPath] = Editor.above(editor, {
            at: startPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        });
        const [, endPath] = Editor.above(editor, {
            at: endPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        });
        // If both points are in the same node we can defer to Slate's
        // wrapNodes. Otherwise we need to do this manually, as wrapNodes with
        // split: true doesn't work when match points at the editor.
        if (Path.equals(startPath, endPath)) {
            Transforms$1.wrapNodes(editor, {
                type: 'exercise',
                children: [],
            }, { at: startPath });
            return;
        }
        // Move start and end points to the extremes, so that splits and moves
        // will correctly move whole line elements.
        startPoint = Editor.start(editor, startPath);
        endPoint = Editor.end(editor, endPath);
        const rangeRef = Editor.rangeRef(editor, Editor.range(editor, startPoint, endPoint));
        // Find lowest common parent of start and end points, which is also
        // a structural element.
        const [[parent, parentPath]] = Editor.levels(editor, {
            at: Path.common(startPath, endPath),
            match: n => Section.isSection(n) || Editor.isEditor(n),
        });
        Transforms$1.splitNodes(editor, { at: endPoint, match: n => n === parent });
        Transforms$1.splitNodes(editor, { at: startPoint, match: n => n === parent });
        const newIndex = Path.relative(Range.start(rangeRef.current).path, parentPath)[0];
        const newPath = [...parentPath, newIndex];
        Transforms$1.insertNodes(editor, {
            type: 'exercise',
            children: [
                {
                    type: 'exercise_problem',
                    children: [],
                },
            ],
        }, { at: newPath });
        Transforms$1.moveNodes(editor, {
            at: rangeRef.unref(),
            to: [...newPath, 0, 0],
            mode: 'highest',
        });
    });
}
/**
 * Insert a solution into an exercise.
 *
 * Does nothing if no exercise is selected. The new solution will be inserted
 * after the last selected item but before the commentary.
 *
 * If select is set to true the selection will be collapsed into the new
 * solution.
 */
function insertSolution(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select = false } = options;
        if (at == null)
            return;
        const [exercise, exercisePath] = Editor.above(editor, {
            at,
            match: Exercise.isExercise,
        });
        if (exercise == null)
            return;
        const index = Path.relative(Editor.path(editor, at), exercisePath)[0];
        const item = exercise.children[index];
        const newPath = Commentary.isCommentary(item)
            ? [...exercisePath, index]
            : [...exercisePath, index + 1];
        Transforms$1.insertNodes(editor, {
            type: 'exercise_solution',
            children: [
                {
                    type: 'paragraph',
                    children: [{ text: "" }],
                },
            ],
        }, { at: newPath, select });
    });
}
/**
 * Insert a commentary into an exercise
 *
 * Does nothing if no exercise is selected, or if selected exercise already has
 * a commentary.
 *
 * If select is set to true the selection will be collapsed into the new
 * commentary.
 */
function insertCommentary(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select = false } = options;
        if (at == null)
            return;
        const [exercise, path] = Editor.above(editor, {
            at,
            match: Exercise.isExercise,
        });
        if (exercise == null)
            return;
        const last = exercise.children[exercise.children.length - 1];
        if (Commentary.isCommentary(last))
            return;
        const newPath = [...path, exercise.children.length];
        Transforms$1.insertNodes(editor, {
            type: 'exercise_commentary',
            children: [
                {
                    type: 'paragraph',
                    children: [{ text: "" }],
                },
            ],
        }, { at: newPath, select });
    });
}

var ExerciseTransforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    insertCommentary: insertCommentary,
    insertExercise: insertExercise,
    insertSolution: insertSolution
});

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
function itemToChildren(media) {
    const alt = {
        type: 'media_alt',
        children: [{ text: '' }],
    };
    if (Media.isMedia(media)) {
        if (!media.children.some(AltText.isAltText)) {
            media.children.push(alt);
        }
        return [media];
    }
    return [{
            type: 'media',
            children: [{ ...media, children: [] }, alt],
        }];
}
/** Insert a new figure */
function insertFigure(editor, media, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options;
        if (at == null)
            return;
        Transforms$1.insertNodes(editor, {
            type: 'figure',
            children: itemToChildren(media),
        }, { at });
    });
}
/**
 * Insert a new sub-figure
 *
 * Does nothing if selection contains no figure.
 */
function insertSubfigure(editor, media, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const [figure, figurePath] = (_a = Editor.above(editor, {
            at,
            match: Figure.isFigure,
            mode: 'highest',
        })) !== null && _a !== void 0 ? _a : [];
        if (figure == null)
            return;
        let newIndex;
        if (!Figure.isFigure(figure.children[0])) {
            // Figure has no sub-figures yet; wrap its only child into
            // a sub-figure.
            Transforms$1.wrapNodes(editor, {
                type: 'figure',
                children: [],
            }, { at: [...figurePath, 0] });
            // There is only one possible location for the new sub-figure:
            // between the first sub-figure and (possibly) the caption.
            newIndex = 1;
        }
        else {
            // Place the new sub-figure after the currently selected one ...
            newIndex = Path.relative(Editor.end(editor, at).path, figurePath)[0] + 1;
            // ... but before the caption.
            if (newIndex === figure.children.length
                && Caption.isCaption(figure.children[newIndex])) {
                newIndex -= 1;
            }
        }
        Transforms$1.insertNodes(editor, {
            type: 'figure',
            children: itemToChildren(media),
        }, { at: [...figurePath, newIndex] });
    });
}
/**
 * Add caption to the inner-most selected figure which does not yet have one
 *
 * If select is set to true the selection will be collapsed into the new
 * caption.
 */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion --
    typescript-eslint#2248 */
function insertCaption(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { select } = options;
        let { at = editor.selection } = options;
        if (at == null)
            return;
        for (;;) {
            const [figure, figurePath] = (_a = Editor.above(editor, {
                at,
                match: Figure.isFigure,
            })) !== null && _a !== void 0 ? _a : [];
            if (figure == null)
                return;
            if (Caption.isCaption(figure.children[figure.children.length - 1])) {
                at = figurePath;
                continue;
            }
            const newPath = [...figurePath, figure.children.length];
            Transforms$1.insertNodes(editor, {
                type: 'caption',
                children: [{ text: '' }],
            }, { at: newPath, select });
            break;
        }
    });
}
/* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */

var FigureTransforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    insertCaption: insertCaption,
    insertFigure: insertFigure,
    insertSubfigure: insertSubfigure
});

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Add a new definition to the glossary
 *
 * If there is no glossary in the document a new one will be created.
 *
 * If select is set to true the selection will be collapsed into the new
 * definition.
 */
function addGlossaryDefinition(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { at = editor.selection, mode = 'after', select } = options;
        if (at == null)
            return;
        const toInsert = Range.isCollapsed(at)
            ? [{ text: '' }]
            : unpackBlocks(editor, Editor.fragment(editor, at));
        const node = {
            type: 'definition',
            children: [{
                    type: 'definition_term',
                    children: toInsert,
                }],
        };
        // Fast path: there is no glossary in the document.
        if (!Glossary.isGlossary(editor.children[editor.children.length - 1])) {
            Transforms$1.insertNodes(editor, {
                type: 'glossary',
                children: [node],
            }, { at: [editor.children.length], select });
            return;
        }
        const [start, end] = Range.edges(Editor.range(editor, at));
        const path = mode === 'before' ? start.path : end.path;
        let [glossary, glossaryPath] = (_a = Editor.above(editor, {
            at: path,
            match: Glossary.isGlossary,
        })) !== null && _a !== void 0 ? _a : [];
        let index;
        if (glossary == null) {
            glossaryPath = [editor.children.length - 1];
            glossary = Editor.node(editor, glossaryPath)[0];
            index = mode === 'before' ? 0 : glossary.children.length;
        }
        else {
            index = Path.relative(path, glossaryPath)[0]
                + (mode === 'before' ? 0 : 1);
        }
        Transforms$1.insertNodes(editor, node, {
            at: [...glossaryPath, index],
            select,
        });
    });
}
/**
 * Insert new item into a definition
 *
 * Does nothing if no definition is selected.
 *
 * If select is set to true the selection will be collapsed into the new item.
 */
function insertItem(editor, element, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select } = options;
        if (at == null)
            return;
        const atPath = Editor.path(editor, at);
        const [[definition, definitionPath]] = Editor.levels(editor, {
            at: atPath,
            match: Definition.isDefinition,
        });
        if (definition == null)
            return;
        const index = Path.relative(atPath, definitionPath)[0];
        const item = definition.children[index];
        const newPath = SeeAlso.isSeeAlso(item)
            ? [...definitionPath, index]
            : [...definitionPath, index + 1];
        Transforms$1.insertNodes(editor, {
            ...element,
            children: [{
                    type: 'paragraph',
                    children: [{ text: "" }],
                }],
        }, { at: newPath, select });
    });
}
/**
 * Insert a new meaning into a definition
 *
 * Does nothing if no definition is selected.
 */
function insertMeaning(editor, options = {}) {
    insertItem(editor, { type: 'definition_meaning' }, options);
}
/**
 * Insert a new example into a definition
 *
 * Does nothing if no definition is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * example.
 */
function insertDefinitionExample(editor, options = {}) {
    insertItem(editor, { type: 'definition_example' }, options);
}
/**
 * Insert a new see-also section into a definition.
 *
 * Does nothing if no definition is selected. If the definition already contains
 * a see-also section, a new see-also term is added to it instead.
 *
 * If select is set to true the selection will be collapsed into the new
 * see-also term.
 */
function insertSeeAlso(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select } = options;
        if (at == null)
            return;
        const atPath = Editor.path(editor, at);
        const [[definition, definitionPath]] = Editor.levels(editor, {
            at: atPath,
            match: Definition.isDefinition,
        });
        if (definition == null)
            return;
        const relPath = Path.relative(atPath, definitionPath);
        const index = relPath[0];
        const item = definition.children[index];
        let newPath;
        let node = {
            type: 'definition_term',
            children: [{ text: '' }],
        };
        if (SeeAlso.isSeeAlso(item)) {
            newPath = [...definitionPath, index, relPath[1] + 1];
        }
        else {
            newPath = [...definitionPath, definition.children.length];
            node = {
                type: 'definition_seealso',
                children: [node],
            };
        }
        Transforms$1.insertNodes(editor, node, { at: newPath, select });
    });
}

var GlossaryTransforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addGlossaryDefinition: addGlossaryDefinition,
    insertDefinitionExample: insertDefinitionExample,
    insertMeaning: insertMeaning,
    insertSeeAlso: insertSeeAlso
});

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Add a new media item to a Media element */
function addMediaItem(editor, item, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { at = editor.selection, select } = options;
        if (at == null)
            return;
        const [media, mediaPath] = (_a = Editor.above(editor, {
            at,
            match: Media.isMedia,
        })) !== null && _a !== void 0 ? _a : [];
        if (media == null)
            return;
        const newIndex = Path.relative(Editor.end(editor, at).path, mediaPath)[0] + 1;
        Transforms$1.insertNodes(editor, {
            ...item,
            children: [{ text: '' }],
        }, { at: [...mediaPath, newIndex], select });
    });
}

var MediaTransforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addMediaItem: addMediaItem
});

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/**
 * Create a new exercise and wrap currently selected block in it
 *
 * This function is similar to Slate's Transforms.wrapNodes, but it won't split
 * line elements.
 */
function insertRule(editor, kind, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options;
        if (at == null)
            return;
        let [startPoint, endPoint] = Range.edges(Editor.range(editor, at));
        // Find lowest non-inline nodes containing start and end points.
        const [, startPath] = Editor.above(editor, {
            at: startPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        });
        const [, endPath] = Editor.above(editor, {
            at: endPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        });
        // If both points are in the same node we can defer to Slate's
        // wrapNodes. Otherwise we need to do this manually, as wrapNodes with
        // split: true doesn't work when match points at the editor.
        if (Path.equals(startPath, endPath)) {
            Transforms$1.wrapNodes(editor, {
                type: 'rule',
                kind: kind !== null && kind !== void 0 ? kind : 'rule',
                children: [],
            }, { at: startPath });
            return;
        }
        // Move start and end points to the extremes, so that splits and moves
        // will correctly move whole line elements.
        startPoint = Editor.start(editor, startPath);
        endPoint = Editor.end(editor, endPath);
        const rangeRef = Editor.rangeRef(editor, Editor.range(editor, startPoint, endPoint));
        // Find lowest common parent of start and end points, which is also
        // a structural element.
        const [[parent, parentPath]] = Editor.levels(editor, {
            at: Path.common(startPath, endPath),
            match: n => Section.isSection(n) || Editor.isEditor(n),
        });
        Transforms$1.splitNodes(editor, { at: endPoint, match: n => n === parent });
        Transforms$1.splitNodes(editor, { at: startPoint, match: n => n === parent });
        const newIndex = Path.relative(Range.start(rangeRef.current).path, parentPath)[0];
        const newPath = [...parentPath, newIndex];
        Transforms$1.insertNodes(editor, {
            type: 'rule',
            kind: kind !== null && kind !== void 0 ? kind : 'rule',
            children: [
                {
                    type: 'rule_statement',
                    children: [],
                },
            ],
        }, { at: newPath });
        Transforms$1.moveNodes(editor, {
            at: rangeRef.unref(),
            to: [...newPath, 0, 0],
            mode: 'highest',
        });
    });
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
function insertInRule(editor, element, options) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, after = () => false, within, select, } = options;
        if (at == null)
            return;
        const atPath = Editor.path(editor, at);
        const [[rule, rulePath]] = Editor.levels(editor, {
            at: atPath,
            match: Rule.isRule,
        });
        if (rule == null)
            return;
        const index = Path.relative(atPath, rulePath)[0];
        let newIndex;
        if (within(rule.children[index])) {
            newIndex = index + 1;
        }
        else {
            for (newIndex = rule.children.length - 1;; --newIndex) {
                const item = rule.children[newIndex];
                if (within(item) || after(item)) {
                    break;
                }
            }
            newIndex += 1;
        }
        Transforms$1.insertNodes(editor, {
            ...element,
            children: [
                {
                    type: 'paragraph',
                    children: [{ text: "" }],
                },
            ],
        }, { at: [...rulePath, newIndex], select });
    });
}
/**
 * Insert a new statement into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * statement.
 */
function insertStatement(editor, options = {}) {
    insertInRule(editor, { type: 'rule_statement' }, {
        ...options,
        within: Statement.isStatement,
    });
}
/**
 * Insert a new proof into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new proof.
 */
function insertProof(editor, options = {}) {
    insertInRule(editor, { type: 'rule_proof' }, {
        ...options,
        after: Statement.isStatement,
        within: Proof.isProof,
    });
}
/**
 * Insert a new example into a rule
 *
 * Does nothing if no rule is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * example.
 */
function insertRuleExample(editor, options = {}) {
    insertInRule(editor, { type: 'rule_example' }, {
        ...options,
        after: n => Proof.isProof(n) || Statement.isStatement(n),
        within: RuleExample.isRuleExample,
    });
}

var RuleTransforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    insertProof: insertProof,
    insertRule: insertRule,
    insertRuleExample: insertRuleExample,
    insertStatement: insertStatement
});

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Insert a new section title, wrapping it and following nodes in a section */
function wrapSectionTitle(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a;
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const range = Editor.range(editor, at);
        // Find location for the new section
        /* eslint-disable-next-line
            @typescript-eslint/no-extra-non-null-assertion --
            Editor is above every path, so this cannot return null */
        const [parent, parentPath] = Editor.above(editor, {
            at: range,
            match: node => Section.isSection(node) || Editor.isEditor(node),
        });
        // Find the node to transform into new section's title
        const [maybeTitle, maybeTitlePath] = (_a = Editor.above(editor, {
            at: range,
            match: node => parent.children.includes(node) && Paragraph.isParagraph(node),
        })) !== null && _a !== void 0 ? _a : [];
        if (maybeTitle == null) {
            throw new Error("only paragraphs which are direct descendants of \
                sections may become section titles");
        }
        // Find location for the new section
        let sectionIndex = 0;
        for (; sectionIndex < parent.children.length; ++sectionIndex) {
            if (Section.isSection(parent.children[sectionIndex]))
                break;
        }
        // Insert new section
        Transforms$1.insertNodes(editor, { type: 'section', children: [] }, { at: [...parentPath, sectionIndex] });
        const sectionPath = Editor.pathRef(editor, [...parentPath, sectionIndex]);
        // When selection is collapsed we treat the entire paragraph as the new
        // title, otherwise we extract only the selected fragment.
        let titlePath;
        if (Range.isCollapsed(range)) {
            titlePath = maybeTitlePath;
        }
        else {
            const [start, end] = Range.edges(range);
            let container = maybeTitle;
            if (!Editor.isEnd(editor, end, maybeTitlePath)) {
                Transforms$1.splitNodes(editor, {
                    at: end,
                    match: node => node === container,
                });
                container = Node.ancestor(editor, maybeTitlePath);
            }
            if (!Editor.isStart(editor, start, maybeTitlePath)) {
                titlePath = Path.next(maybeTitlePath);
                Transforms$1.splitNodes(editor, {
                    at: start,
                    match: node => node === container,
                });
            }
            else {
                titlePath = maybeTitlePath;
            }
            // Keep selection on the title
            Transforms$1.select(editor, titlePath);
        }
        Transforms$1.setNodes(editor, { type: 'title' }, { at: titlePath });
        // Move content into section. We do it from the end, to prevent index
        // inconsistency in suggestions (in normal mode we'd be always moving
        // from titlePath, but in suggestion move leaves behind a marker, and
        // indexes would change).
        for (let index = sectionPath.current[sectionPath.current.length - 1] - 1; index >= titlePath[titlePath.length - 1]; --index) {
            editor.apply({
                type: 'move_node',
                path: [...parentPath, index],
                newPath: [...sectionPath.current, 0],
            });
        }
    });
}
/** Increase depth of a section */
function increaseSectionDepth(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a, _b;
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const [section, sectionPath] = (_a = Editor.above(editor, {
            at,
            match: Section.isSection,
        })) !== null && _a !== void 0 ? _a : [];
        if (section == null)
            return;
        const [prev, prevPath] = (_b = Editor.previous(editor, {
            at: sectionPath,
            match: Section.isSection,
        })) !== null && _b !== void 0 ? _b : [];
        if (prev == null)
            return;
        const newPath = [...prevPath, prev.children.length];
        // Move section at the end of prev.
        Transforms$1.moveNodes(editor, {
            at: sectionPath,
            to: newPath,
        });
        // Move all subsections of section after it into prev. This way we only
        // change depth of section and not of its subsections.
        Transforms$1.moveNodes(editor, {
            at: newPath,
            match: n => Section.isSection(n) && section.children.includes(n),
            to: Path.next(newPath),
        });
    });
}
/** Decrease depth of a section */
function decreaseSectionDepth(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const [section, sectionPath] = Editor.above(editor, {
            at,
            match: Section.isSection,
        });
        // If section path is shorter than two then it can't be nested in
        // another section, and thus its depth can't be decreased.
        if (section == null || sectionPath.length < 2)
            return;
        const [parent, parentPath] = Editor.parent(editor, sectionPath);
        // Move all sections after section at the end of it. This way we only
        // change depth of section and not of sections after it.
        Transforms$1.moveNodes(editor, {
            at: Editor.range(editor, sectionPath, parentPath),
            match: n => n !== section && Section.isSection(n) && parent.children.includes(n),
            to: [...sectionPath, section.children.length],
        });
        // Move section after parent.
        Transforms$1.moveNodes(editor, {
            at: sectionPath,
            to: Path.next(parentPath),
        });
    });
}

var StructureTransforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decreaseSectionDepth: decreaseSectionDepth,
    increaseSectionDepth: increaseSectionDepth,
    wrapSectionTitle: wrapSectionTitle
});

// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
const Transforms = {
    ...ExerciseTransforms,
    ...FigureTransforms,
    ...GlossaryTransforms,
    ...MediaTransforms,
    ...RuleTransforms,
    ...StructureTransforms,
};

export { ADMONITION_KINDS, Admonition, AltText, Audio, BulletedList, CASES, Caption, Code, Commentary, CrossReference, Definition, DefinitionExample, DefinitionTerm, DocumentReference, EnumeratedList, Equation, Exercise, Figure, Footnote, Foreign, Glossary, IdEditor, Image, Link, List, Meaning, Media, MediaData, MediaUse, Paragraph, Preformat, Problem, ProcessingInstruction, Proof, Quotation, RULE_KINDS, Rule, RuleExample, Section, SeeAlso, Solution, Statement, Term, Title, Transforms, Video, WithClasses, cloneNode, dedup, enumerate, isInline, isVoid, onKeyDown, unpackBlocks, uuid, withCnx, withIds };
//# sourceMappingURL=index.es.js.map