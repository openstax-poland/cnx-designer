// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/** @jsx JSX.createElement */

import { Editor, Element, Node, Text } from 'slate'

import * as JSX from './jsx'
import {
    Admonition, AltText, Audio, Caption, Code, Commentary, CrossReference,
    Definition, DefinitionExample, DefinitionTerm, DocumentReference, Exercise,
    Figure, Footnote, Foreign, Glossary, Image, Link, List, ListItem, Meaning,
    Media, MediaData, NumberStyle, Paragraph, Preformat, Problem, ProcessingInstruction,
    Proof, Quotation, Rule, RuleExample, Section, SeeAlso, Solution, Statement,
    StyledText, Term, Title, Video, WithClasses,
} from '../interfaces'
import { uuid } from '../util'
import { Document as Doc } from '.'

/** Serialization options */
export interface Options<Format> {
    /** Format to which to serialize */
    format: Format
    /** Function used to determine the MIME type of a media item */
    mediaMime: MediaMimeFunction
    /** Function used to serialize custom nodes */
    serializeNode?: PartialSerializer
}

/** Function used to determine the MIME type of a media item */
export type MediaMimeFunction = (media: MediaData) => string

/**
 * Function used to serialize custom nodes
 *
 * If provided, the serialization routine will first consult this function. If
 * a non-null value is returned it will be used as node's serialization.
 * Otherwise serialization will proceed as if this function wasn't provided.
 */
export type PartialSerializer =
    (node: Node, attrs: CommonAttrs, children: JSX.Node, ctx: Context) => JSX.Node

/* eslint-disable import/export -- see eslint-plugin-import#1590 */
export default function serialize(
    editor: Editor, document: Doc, options: Options<'xml'>): string
export default function serialize(
    editor: Editor, document: Doc, options: Options<'dom'>): Document

/** Serialize a document to CNXML */
export default function serialize(
    editor: Editor,
    doc: Doc,
    options: Options<'xml' | 'dom'>,
): string | Document {
    const { format, mediaMime } = options
    const context = {
        mediaMime,
        serializeNode: options.serializeNode,
    }

    const content = doc.content.map(n => serializeNode(editor, n, context))
    const glossary = Glossary.isGlossary(doc.content[doc.content.length - 1])
        ? content.pop()!
        : null

    const document = JSX.render(<document
        xmlns={JSX.CNXML_NAMESPACE}
        cnxml-version={doc.version}
        id={doc.moduleId}
        module-id={doc.moduleId}
        xmlLang={doc.language}
        class={doc.classes?.join(' ')}
        >
        <title>{doc.title}</title>
        <content>
            {content}
        </content>
        {glossary}
    </document>)

    if (format === 'dom') {
        return document
    }

    let x = new XMLSerializer().serializeToString(document)

    // Some browsers serialize XML without declaration.
    if (!x.startsWith('<?xml')) {
        x = `<?xml version="1.0" encoding="${document.characterSet}"?>\n${x}`
    }

    return x
}
/* eslint-enable import/export */

/** Serialization context */
export interface Context {
    mediaMime: MediaMimeFunction
    serializeNode?: PartialSerializer
}

/** Attributes common to all elements */
export interface CommonAttrs {
    /** Element's ID */
    id: string
    /** CSS classes */
    class?: string
}

/** Serialize a single node */
function serializeNode(editor: Editor, node: Node, ctx: Context): JSX.Node {
    if (Text.isText(node)) {
        let n: JSX.Node = node.text

        for (const style of STYLES) {
            if (style in node) {
                n = applyTextStyle(style, node[style] as string | boolean, n)
            }
        }

        return n
    }

    const children = Editor.hasInlines(editor, node)
        ? serializeLine(editor, node, ctx)
        : node.children.map(n => serializeNode(editor, n, ctx))

    const attributes: CommonAttrs = {
        id: node.id as string || `UUID${uuid.v4()}`,
    }

    if (WithClasses.hasClasses(node)) {
        attributes.class = node.classes.join(' ')
    }

    if (ctx.serializeNode != null) {
        const n = ctx.serializeNode(node, attributes, children, ctx)
        if (n != null) {
            return n
        }
    }

    for (const [test, serializer] of SERIALIZERS) {
        if (test(node)) {
            return serializer(node, attributes, children, ctx)
        }
    }

    throw new Error(`no serializer defined for ${JSON.stringify(node)}`)
}

interface MarkedText extends Text {
    emphasis?: boolean
    strong?: boolean
    position?: ''
}

/** Check if a node contains only plain, unmarked text */
function isPlainText(node: Node): boolean {
    if (Element.isElement(node)) {
        return node.children.every(isPlainText)
    }

    const text = node as StyledText

    return !text.emphasis
        && !text.strong
        && (text.position == null || text.position === 'normal')
}

/** Name of a style attribute on a {@link StyledText} node */
type TextStyle = 'emphasis' | 'strong' | 'position'

const STYLES: TextStyle[] = ['emphasis', 'strong', 'position']

/** Map storing values of style attributes of a {@link StyledText} node */
type Style = Map<TextStyle, string | boolean>

/** Apply a single text style to a rendered inline node or text */
function applyTextStyle(style: TextStyle, value: string | boolean, node: JSX.Node): JSX.Node {
    switch (style) {
    case 'emphasis':
        return value
            ? <emphasis xmlns={JSX.CNXML_NAMESPACE} effect="italics">{node}</emphasis>
            : node

    case 'strong':
        return value
            ? <emphasis xmlns={JSX.CNXML_NAMESPACE} effect="bold">{node}</emphasis>
            : node

    case 'position':
        return value === 'superscript'
            ? <sup xmlns={JSX.CNXML_NAMESPACE}>{node}</sup>
            : value === 'subscript'
                ? <sub xmlns={JSX.CNXML_NAMESPACE}>{node}</sub>
                : node
    }
}

/** Apply collection of text styles to a rendered inline node or text */
function applyStyle(styles: Style, node: JSX.Node): JSX.Node {
    for (const [style, value] of styles) {
        node = applyTextStyle(style, value, node)
    }

    return node
}

/** Serialize a single line of text */
function serializeLine(editor: Editor, node: Element, ctx: Context): JSX.Node {
    const out: JSX.Node[] = []
    const text: [Style, JSX.Node[]][] = [[new Map(), []]]

    /** Flush all accumulated text into output */
    function flush(): void {
        while (text.length > 1) {
            const [style, nodes] = text.pop()!
            text[text.length - 1][1].push(applyStyle(style, nodes))
        }

        const [style, nodes] = text.pop()!
        text.push([new Map(), []])

        out.push(applyStyle(style, nodes))
    }

    /** Collapse style stack below certain depth */
    function collapse(from: number): void {
        for (let i = text.length - 1 ; i > from ; --i) {
            const [style, nodes] = text[i]

            if (nodes.length > 0) {
                text[i - 1][1].push(applyStyle(style, nodes))
                text[i][1] = []
            }
        }
    }

    /** Apply style to all future text */
    function changeStyle(changed: Style): void {
        const keep = new Set()

        // Remove from changed any styles which are already present on
        // the stack.
        for (const [style] of text) {
            for (const [name, value] of style) {
                if (changed.has(name) && changed.get(name) === value) {
                    changed.delete(name)
                    keep.add(name)
                }
            }
        }

        // Then remove from the stack any unwanted styles.
        for (let i = text.length - 1 ; i >= 0 ; --i) {
            const [style] = text[i]

            for (const [name, value] of style) {
                // Since we want to keep each style in only one stack entry,
                // this check is necessary to prevent styles we want to keep
                // from being collapsed (as since they were removed from changed
                // the next if would consider them unwanted).
                if (keep.has(name)) continue

                if (!changed.has(name) || changed.get(name) !== value) {
                    collapse(i)
                    text[i][1] = [applyTextStyle(name, value, text[i][1])]
                    style.delete(name)
                }
            }

            // If all styles at this depth were removed, drop this entry.
            if (style.size === 0 && i > 0) {
                collapse(i)
                text[i - 1][1].push(...text[i][1])
                text.splice(i, 1)
            }
        }

        if (changed.size > 0) {
            text.push([changed, []])
        }
    }

    for (const child of node.children) {
        if (!Text.isText(child)) {
            flush()
            out.push(serializeNode(editor, child, ctx))
            continue
        }

        const style = new Map()
        for (const k of STYLES) {
            if (k in child) {
                style.set(k, child[k])
            }
        }

        changeStyle(style)
        text[text.length - 1][1].push(child.text)
    }

    flush()
    return out
}

/** Function serializing a node to a CNXML element */
type Serializer<T extends Node> =
    (node: T, attrs: CommonAttrs, children: JSX.Node, ctx: Context) => JSX.Node

type SerializerEntry<T extends Node> = [(node: Node) => node is T, Serializer<T>]

/**
 * Node serializers
 *
 * The first element of each entry is a node matcher, the second is a serializer
 * function. {@link serializeNode} will use serializer function of the first
 * entry whose matcher function returned true.
 */
const SERIALIZERS: SerializerEntry<Node>[] = [
    [Admonition.isAdmonition, admonition],
    [AltText.isAltText, altText],
    [Audio.isAudio, mediaItem],
    [Caption.isCaption, makeSerializer('caption')],
    [Code.isCode, code],
    [Commentary.isCommentary, makeSerializer('commentary')],
    [CrossReference.isCrossReference, xref],
    [Definition.isDefinition, makeSerializer('definition')],
    [DefinitionExample.isDefinitionExample, makeSerializer('example')],
    [DefinitionTerm.isDefinitionTerm, term],
    [DocumentReference.isDocumentReference, docref],
    [Exercise.isExercise, makeSerializer('exercise')],
    [Figure.isFigure, figure],
    [Footnote.isFootnote, makeSerializer('footnote')],
    [Foreign.isForeign, foreign],
    [Glossary.isGlossary, makeSerializer('glossary')],
    [Image.isImage, mediaItem],
    [Link.isLink, link],
    [List.isList, list],
    [ListItem.isListItem, makeSerializer('item')],
    [Meaning.isMeaning, makeSerializer('meaning')],
    [Media.isMedia, media],
    [Paragraph.isParagraph, makeSerializer('para')],
    [Preformat.isPreformat, makeSerializer('preformat')],
    [ProcessingInstruction.isProcessingInstruction, processingInstruction],
    [Problem.isProblem, makeSerializer('problem')],
    [Proof.isProof, makeSerializer('proof')],
    [Quotation.isQuotation, makeSerializer('quote')],
    [Rule.isRule, rule],
    [RuleExample.isRuleExample, makeSerializer('example')],
    [Section.isSection, makeSerializer('section')],
    [SeeAlso.isSeeAlso, makeSerializer('seealso')],
    [Solution.isSolution, makeSerializer('solution')],
    [Statement.isStatement, makeSerializer('statement')],
    [Term.isTerm, term],
    [Title.isTitle, makeSerializer('title')],
    [Video.isVideo, mediaItem],
// XXX: what we'd like to do is type this array as
// (<T extends Node> SerializerEntry<T>)[], but since such types aren't
// currently supported we need this cast.
] as SerializerEntry<Node>[]

/** Create a serializer to a given tag from a given namespace */
// eslint-disable-next-line @typescript-eslint/naming-convention
function makeSerializer(Tag: string, namespace: string = JSX.CNXML_NAMESPACE) {
    return function serializer(node: Node, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
        return <Tag xmlns={namespace} {...attrs}>{ children }</Tag>
    }
}

function admonition(node: Admonition, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <note xmlns={JSX.CNXML_NAMESPACE} type={node.kind} {...attrs}>{children}</note>
}

function altText(node: AltText, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    // If alt-text contains only plain text it will be instead emitted in an
    // alt attribute on a <media> element.
    if (isPlainText(node)) {
        return null
    }

    return <alt-text xmlns={JSX.EDITING_NAMESPACE} {...attrs}>{children}</alt-text>
}

function code(node: Element & Code, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <code
        xmlns={JSX.CNXML_NAMESPACE}
        display={node.placement === 'block' ? 'block' : undefined}
        lang={node.language}
        {...attrs}
        >
        {children}
    </code>
}

function docref(node: DocumentReference, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <link xmlns={JSX.CNXML_NAMESPACE} document={node.document} {...attrs}>{ children }</link>
}

function figure(node: Figure, attrs: CommonAttrs, children: JSX.Node[]): JSX.Node {
    function mapChild(child: JSX.Node): JSX.Node {
        if (Array.isArray(child)) {
            return child.map(mapChild)
        }

        if (!JSX.Node.isElement(child)) {
            return child
        }

        if (child.name.namespace === JSX.CNXML_NAMESPACE
        && child.name.local === 'figure') {
            return {
                ...child,
                name: {
                    namespace: JSX.CNXML_NAMESPACE,
                    local: 'subfigure',
                },
            }
        }

        return child
    }

    return <figure xmlns={JSX.CNXML_NAMESPACE} {...attrs}>
        {mapChild(children)}
    </figure>
}

function foreign(node: Foreign, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <foreign xmlns={JSX.CNXML_NAMESPACE} xmlLang={node.language} {...attrs}>
        { children }
    </foreign>
}

function link(node: Link, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <link xmlns={JSX.CNXML_NAMESPACE} url={node.url} {...attrs}>{ children }</link>
}

function list(node: List, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    function mapChild(child: JSX.Node): JSX.Node {
        if (Array.isArray(child)) return child.map(mapChild)

        if (!JSX.Node.isElement(child)) {
            return child
        }

        if ((child.name.namespace == null || child.name.namespace === JSX.CNXML_NAMESPACE)
        && child.name.local === 'list') {
            return <item xmlns={JSX.CNXML_NAMESPACE}>{child}</item>
        }

        return child
    }

    return <list
        xmlns={JSX.CNXML_NAMESPACE}
        list-type={node.style === 'enumerated' ? node.style : undefined}
        bullet-style={(node.bullet !== 'bullet' ? node.bullet : undefined) as string}
        number-style={(node.numberStyle !== 'arabic' ? node.numberStyle : undefined) as NumberStyle}
        start-value={(node.start !== 1 ? node.start : undefined) as number}
        {...attrs}
        >
        {mapChild(children)}
    </list>
}

function media(node: Media, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    let alt: string

    const altNode = node.children.find(n => AltText.isAltText(n))
    if (altNode != null && isPlainText(altNode)) {
        alt = Node.string(altNode)
    }

    return <media xmlns={JSX.CNXML_NAMESPACE} alt={alt!} {...attrs}>{children}</media>
}

function mediaItem(
    node: Audio | Image | Video,
    attrs: CommonAttrs,
    children: JSX.Node,
    ctx: Context,
): JSX.Node {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const Tag = node.type.slice(6) as 'audio' | 'image' | 'video'

    return <Tag
        xmlns={JSX.CNXML_NAMESPACE}
        src={node.src}
        mime-type={ctx.mediaMime(node)}
        for={node.intendedUse === 'all' ? undefined : node.intendedUse}
        {...attrs}
        >
        {children}
    </Tag>
}

function processingInstruction(node: ProcessingInstruction): JSX.Node {
    return { target: node.target, value: node.value }
}

function rule(node: Rule, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <rule
        xmlns={JSX.CNXML_NAMESPACE}
        type={node.kind === 'rule' ? undefined : node.kind}
        {...attrs}>
        {children}
    </rule>
}

function term(node: Term, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <term
        xmlns={JSX.CNXML_NAMESPACE}
        cxlxtIndex={node.index}
        cmlnleReference={node.reference}
        {...attrs}>
        { children }
    </term>
}

function xref(node: CrossReference, attrs: CommonAttrs, children: JSX.Node): JSX.Node {
    return <link
        xmlns={JSX.CNXML_NAMESPACE}
        target-id={node.target}
        document={node.document ?? undefined}
        cmlnleCase={node.case}
        {...attrs}
        >
        {children}
    </link>
}
