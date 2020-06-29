// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in definition of CMLNLE.Attributes.Cased
import { Case } from '../interfaces'

/** Qualified name of an element or attribute */
export interface Name {
    /**
     * Namespace
     *
     * When omitted for an element name it is inherited form the parent element.
     * When omitted for an attribute, the name refers to the default namespace.
     */
    namespace?: string
    /** Local name */
    local: string
}

/** An element */
export interface Element {
    /** Element's name */
    name: Name
    /** Attributes set on this element */
    attributes: Attributes
    /** Children nodes */
    children: Node
}

export type Attributes = Omit<JSX.IntrinsicAttributes, 'children'> & { [key: string]: unknown }

/** Any value that can be used as child of a JSX element */
export type Node = Element | globalThis.Node | string | Node[] | null

/** JSX element creator */
export function createElement<
    K extends keyof JSX.IntrinsicElements,
    A extends JSX.IntrinsicAttributes,
>(
    name: K,
    attrs: A | null,
    ...children: Node[]
): Element {
    const { xmlns, ...attributes } = attrs ?? ({} as Attributes)

    return {
        name: { namespace: xmlns, local: name },
        attributes,
        children,
    }
}

export const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'

export const XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'

export const CNXML_NAMESPACE = 'http://cnx.rice.edu/cnxml'

/** Natural language extensions to CNXML */
export const CMLNLE_NAMESPACE = 'http://katalysteducation.org/cmlnle/1.0'

/** CNXML extensions to facilitate better editing experience */
export const EDITING_NAMESPACE = 'http://adaptarr.naukosfera.com/editing/1.0'

/** Mapping from XML prefixes to namespace URIs */
const NAMESPACE_PREFIXES: { [prefix: string]: string } = {
    xml: XML_NAMESPACE,
    cmlnle: CMLNLE_NAMESPACE,
    editing: EDITING_NAMESPACE,
}

interface Renderer {
    namespace: string | null
    doc: Document
    depth: number
}

/** Render a JSX element into an XML document */
export function render(root: Element): Document {
    const namespace = root.name.namespace
    const doc = document.implementation.createDocument(
        namespace ?? null, root.name.local, null)
    const renderer = { namespace: namespace ?? null, doc, depth: 0 }

    for (const [prefix, uri] of Object.entries(NAMESPACE_PREFIXES)) {
        if (uri === XML_NAMESPACE) continue

        doc.documentElement.setAttributeNS(XMLNS_NAMESPACE, `xmlns:${prefix}`, uri)
    }

    finishElement(renderer, root, doc.documentElement)

    return doc
}

/** Render a JSX element into an XML element */
function renderElement(renderer: Renderer, element: Element): globalThis.Element {
    const ns = element.name.namespace ?? renderer.namespace
    const el = renderer.doc.createElementNS(ns, element.name.local)

    finishElement(renderer, element, el)

    return el
}

/** CNXML tags which contain only block and can be safely formatted */
const BLOCK_TAGS = [
    'commentary', 'content', 'definition', 'document', 'example', 'exercise',
    'figure', 'glossary', 'item', 'list', 'meaning', 'media', 'note', 'problem',
    'proof', 'quote', 'rule', 'section', 'seealso', 'solution', 'statement',
    'subfigure',
]

/** Finish rendering an already created element */
function finishElement(renderer: Renderer, element: Element, out: globalThis.Element): void {
    for (const [key, value] of Object.entries(element.attributes)) {
        if (value == null) continue

        let val

        switch (typeof value) {
        case 'string':
            val = value
            break

        case 'object':
        case 'boolean':
        case 'number':
        case 'bigint':
            val = value!.toString()
            break

        default:
            continue
        }

        const r = key.match(/([a-z]+)([A-Z][a-z]*)/)
        if (r) {
            const [, prefix, attr] = r
            const ns = NAMESPACE_PREFIXES[prefix]

            if (ns == null) {
                throw new Error(
                    `unknown namespace prefix ${prefix} for attribute ${key}`)
            }

            out.setAttributeNS(ns, attr.toLowerCase(), val)
        } else {
            out.setAttribute(key, val)
        }
    }

    const depth = renderer.depth + 1
    const indent = out.namespaceURI === CNXML_NAMESPACE && BLOCK_TAGS.includes(out.tagName)
        ? '\n' + '  '.repeat(depth)
        : null
    const r = {
        ...renderer,
        depth,
        namespace: element.name.namespace ?? renderer.namespace,
    }

    let count = 0

    function renderChild(child: Node): void {
        if (child == null) return

        if (Array.isArray(child)) {
            for (const node of child) {
                renderChild(node)
            }
            return
        }

        if (indent != null) {
            out.append(indent)
        }

        if (child instanceof globalThis.Node) {
            out.append(renderer.doc.importNode(child, true))
        } else if (typeof child === 'string') {
            out.append(child)
        } else {
            out.append(renderElement(r, child))
        }

        count += 1
    }

    renderChild(element.children)

    if (count > 0 && indent != null) {
        out.append('\n' + '  '.repeat(renderer.depth))
    }
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */

declare global {
    /** Types defining CNXML schema for JSX */
    namespace CNXML {
        /** Common attributes */
        namespace Attributes {
            type Display = 'block' | 'inline' | 'none'
            type MediaUse = 'default' | 'pdf' | 'online'

            interface Common {
                id: string
            }

            interface Typed {
                type?: string
            }

            interface LinkUrl {
                url: string
            }

            interface LinkDocument {
                document: string
                version?: string
            }

            interface LinkTarget extends Partial<LinkDocument> {
                'target-id': string
            }

            interface LinkResource extends Partial<LinkDocument> {
                resource: string
            }

            interface LinkWindow {
                window?: 'new' | 'replace'
            }

            type Link = (LinkUrl | LinkDocument | LinkTarget | LinkResource) & LinkWindow

            interface Strength {
                strength?: 1 | 2 | 3
            }

            interface List extends Typed {
                'list-type'?: 'bulleted' | 'enumerated' | 'labeled-item'
                'bullet-style'?: 'bullet' | 'open-circle' | 'pilcrow'
                    | 'rpilcrow' | 'asterisk' | 'dash' | 'section' | 'none'
                    | string
                'number-style'?: 'arabic' | 'upper-alpha' | 'lower-alpha'
                    | 'upper-roman' | 'lower-roman'
                'start-value'?: number
                'mark-prefix'?: string
                'mark-suffix'?: string
                "item-sep"?: string
            }

            interface Code {
                lang?: string
            }

            interface Space {
                count?: number
                effect?: 'normal' | 'underline'
            }

            interface Media {
                src: string
                'mime-type': string
                for?: MediaUse
                longdesc?: string
            }

            interface PlayableMedia extends Media {
                standby?: string
                autoplay?: boolean
                loop?: boolean
                controller?: boolean
                volume?: number
            }

            interface VisualMedia extends Media {
                height?: number
                width?: number
            }
        }

        interface DisplayBlock extends Attributes.Common {
            display?: 'block' | 'none'
        }

        interface DisplayInline extends Partial<Attributes.Common> {
            display: 'inline'
        }

        type DisplayAny<T = Record<string, unknown>> = (DisplayBlock | DisplayInline) & T

        interface Audio extends Partial<Attributes.Common>, Attributes.PlayableMedia {}
        interface Caption extends Partial<Attributes.Common> {}
        type Cite = Partial<Attributes.Common> & Attributes.Link

        interface CiteTitle extends Partial<Attributes.Common> {
            'pub-type'?: 'article' | 'book' | 'booklet' | 'conference'
                | 'inbook' | 'incollection' | 'inproceedings'
                | 'mastersthesis' | 'manual' | 'misc' | 'phdthesis'
                | 'proceedings' | 'techreport' | 'unpublished'
        }

        type Code = DisplayAny<Attributes.Code>
        interface Commentary extends Attributes.Common, Attributes.Typed {}
        interface Content extends Partial<Attributes.Common> {}
        interface Definition extends Attributes.Common, Attributes.Typed {}

        interface Document extends Attributes.Common {
            'cnxml-version': '0.7' | '0.8'
            'module-id': string
        }

        interface Download extends Partial<Attributes.Common>, Attributes.Media {}

        interface Emphasis extends Partial<Attributes.Common> {
            effect?: 'bold' | 'italics' | 'underline' | 'smallcaps' | 'normal'
        }

        interface Equation extends Attributes.Common, Attributes.Typed {}
        interface Example extends Attributes.Common, Attributes.Typed {}

        interface Exercise extends Attributes.Common, Attributes.Typed {
            'print-placement'?: 'end' | 'here'
        }

        interface Figure extends Attributes.Common, Attributes.Typed {
            orient?: 'horizontal' | 'vertical'
        }

        interface Flash extends Partial<Attributes.Common>, Attributes.VisualMedia {
            vmode?: 'window' | 'opaque' | 'transparent'
            quality?: 'low' | 'autolow' | 'autohigh' | 'medium' | 'high'
            loop?: boolean
            scale?: 'default' | 'noorder' | 'exactfit'
            bgcolor?: string
            'flash-vars'?: string
        }

        interface Footnote extends Partial<Attributes.Common> {}
        type Foreign = Partial<Attributes.Common & Attributes.Link>
        interface Glossary extends Partial<Attributes.Common> {}

        interface Image extends Partial<Attributes.Common>, Attributes.VisualMedia {
            'print-width'?: string
            thumbnail?: string
        }

        interface Item extends Partial<Attributes.Common> {}

        interface JavaApplet extends Partial<Attributes.Common> {
            code: string
            'mime-type': string
            for?: Attributes.MediaUse
            codebase?: string
            archive?: string
            name?: string
            src?: string
            height?: number
            width?: number
            longdesc?: string
        }

        interface Label extends Partial<Attributes.Common> {}

        interface Labview extends Partial<Attributes.Common>, Attributes.VisualMedia {
            version: '7.0' | '8.0' | '8.2'
        }

        type Link = Partial<Attributes.Common> & Attributes.Link & Attributes.Strength & CMLNLE.Attributes.Cased
        type List = DisplayAny<Attributes.List>
        interface Meaning extends Attributes.Common {}

        interface Media extends Attributes.Common {
            alt: string
            display?: Attributes.Display
            longdesc?: string
        }

        interface Newline extends Partial<Attributes.Common>, Attributes.Space {}
        type Note = DisplayAny<Attributes.Typed>
        interface Para extends Attributes.Common {}

        interface Param extends Partial<Attributes.Common> {
            name: string
            value: string
        }

        type Preformat = DisplayAny
        interface Problem extends Attributes.Common, Attributes.Typed {}
        interface Proof extends Attributes.Common, Attributes.Typed {}
        type Quote = DisplayAny<Attributes.Typed & Attributes.Link>
        interface Rule extends Attributes.Common, Attributes.Typed {}
        interface Section extends Attributes.Common, Attributes.Typed {}
        interface SeeAlso extends Partial<Attributes.Common>, Attributes.Typed {}

        interface Solution extends Attributes.Common, Attributes.Typed {
            'print-placement'?: 'end' | 'here'
        }

        interface Space extends Partial<Attributes.Common>, Attributes.Space {}
        interface Sub extends Partial<Attributes.Common> {}
        interface Subfigure extends Attributes.Common, Attributes.Typed {}
        interface Sup extends Partial<Attributes.Common> {}
        interface Statement extends Attributes.Common, Attributes.Typed {}
        type Term = Partial<Attributes.Common & Attributes.Link> & CMLNLE.Attributes.Reference
        interface Title extends Partial<Attributes.Common> {}
        interface Video extends Partial<Attributes.Common>, Attributes.PlayableMedia, Attributes.VisualMedia {}
    }

    /** Natural language extensions to CNXML */
    namespace CMLNLE {
        namespace Attributes {
            interface Cased {
                cmlnleCase?: Case
            }

            interface Reference {
                cmlnleReference?: string
            }
        }
    }

    /** CNXML extensions to facilitate better editing experience */
    namespace Editing {
        interface AltText {}
    }

    namespace JSX {
        interface Element {
            name: Name
            attributes: Omit<JSX.IntrinsicAttributes, 'children'> & { [key: string]: unknown }
            children: Node
        }

        interface IntrinsicAttributes {
            xmlns?: string
            xmlLang?: string
            children?: Node
        }

        interface IntrinsicElements {
            'cite-title': IntrinsicAttributes & CNXML.Cite
            'alt-text': IntrinsicAttributes & Editing.AltText
            audio: IntrinsicAttributes & CNXML.Audio
            caption: IntrinsicAttributes & CNXML.Caption
            cite: IntrinsicAttributes & CNXML.Cite
            code: IntrinsicAttributes & CNXML.Code
            commentary: IntrinsicAttributes & CNXML.Commentary
            content: IntrinsicAttributes & CNXML.Content
            definition: IntrinsicAttributes & CNXML.Definition
            document: IntrinsicAttributes & CNXML.Document
            download: IntrinsicAttributes & CNXML.Download
            emphasis: IntrinsicAttributes & CNXML.Emphasis
            equation: IntrinsicAttributes & CNXML.Equation
            example: IntrinsicAttributes & CNXML.Example
            exercise: IntrinsicAttributes & CNXML.Exercise
            figure: IntrinsicAttributes & CNXML.Figure
            flash: IntrinsicAttributes & CNXML.Flash
            footnote: IntrinsicAttributes & CNXML.Footnote
            foreign: IntrinsicAttributes & CNXML.Foreign
            glossary: IntrinsicAttributes & CNXML.Glossary
            image: IntrinsicAttributes & CNXML.Image
            item: IntrinsicAttributes & CNXML.Item
            'java-applet': IntrinsicAttributes & CNXML.JavaApplet
            label: IntrinsicAttributes & CNXML.Label
            labview: IntrinsicAttributes & CNXML.Labview
            link: IntrinsicAttributes & CNXML.Link
            list: IntrinsicAttributes & CNXML.List
            meaning: IntrinsicAttributes & CNXML.Meaning
            media: IntrinsicAttributes & CNXML.Media
            newline: IntrinsicAttributes & CNXML.Newline
            note: IntrinsicAttributes & CNXML.Note
            para: IntrinsicAttributes & CNXML.Para
            param: IntrinsicAttributes & CNXML.Param
            preformat: IntrinsicAttributes & CNXML.Preformat
            problem: IntrinsicAttributes & CNXML.Problem
            proof: IntrinsicAttributes & CNXML.Proof
            quote: IntrinsicAttributes & CNXML.Quote
            rule: IntrinsicAttributes & CNXML.Rule
            section: IntrinsicAttributes & CNXML.Section
            seealso: IntrinsicAttributes & CNXML.SeeAlso
            solution: IntrinsicAttributes & CNXML.Solution
            space: IntrinsicAttributes & CNXML.Space
            statement: IntrinsicAttributes & CNXML.Statement
            sub: IntrinsicAttributes & CNXML.Sub
            subfigure: IntrinsicAttributes & CNXML.Subfigure
            sup: IntrinsicAttributes & CNXML.Sup
            term: IntrinsicAttributes & CNXML.Term
            title: IntrinsicAttributes & CNXML.Title
            video: IntrinsicAttributes & CNXML.Video
        }
    }
}
