// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

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
