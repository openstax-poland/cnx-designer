// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/**
 * XML serializer, because `react-dom` enforces HTML constraints. For example,
 * React required that `<link>` tags have no children, contrary to what
 * CNXML expects.
 */

export const NAMESPACES = {
    xml: 'http://www.w3.org/XML/1998/namespace',
    cmlnle: 'http://katalysteducation.org/cmlnle/1.0',
    editing: 'http://adaptarr.naukosfera.com/editing/1.0',
}

const SPECIAL_PROPS = [
    'children',
]

const REACT_ELEMENT_TYPE = Symbol.for('react.element')

export default function render(tree, options) {
    return new Renderer().render(tree, options)
}

class Renderer {
    render(tree, options={}) {
        const {
            toString = true,
        } = options

        if (tree.$$typeof !== REACT_ELEMENT_TYPE) {
            throw new Error("Root of the document must be an element.")
        }

        const tag = tree.type
        this.ns = tree.props.xmlns || null

        this.doc = document.implementation.createDocument(this.ns, tag)
        const root = this.renderComponent(tree)

        if (!toString) {
            return root
        }

        const xml = new XMLSerializer().serializeToString(root)
        return '<?xml version="1.0" encoding="utf-8"?>\n' + xml
    }

    renderComponent(component) {
        if (component == null) return null

        switch (component.$$typeof) {
        case REACT_ELEMENT_TYPE:
            if (component.type === React.Fragment) {
                return Array.from(
                    component.props.children, c => this.renderComponent(c))
            }

            return this.renderElement(component)

        default:
            if (typeof component === 'string') {
                return this.renderText(component)
            }

            if (component[Symbol.iterator]) {
                return Array.from(component, c => this.renderComponent(c))
            }

            if (component instanceof Node) {
                return this.doc.adoptNode(component)
            }

            throw new Error("Bad component")
        }
    }

    renderText(text) {
        return this.doc.createTextNode(text)
    }

    renderElement(element) {
        const ns = element.props.xmlns || this.ns
        const node = this.doc.createElementNS(ns, element.type)

        for (const [key, value] of Object.entries(element.props)) {
            if (SPECIAL_PROPS.includes(key)) continue

            if (value == null) {
                continue
            }

            const r = key.match(/([a-z]+)([A-Z][a-z]*)/)
            if (r) {
                const [, prefix, attr] = r
                const ns = NAMESPACES[prefix]

                if (!ns) {
                    throw new Error(
                        `unknown prefix ${prefix} for attribute ${key}`)
                }

                node.setAttributeNS(ns, attr.toLowerCase(), value.toString())
            } else {
                node.setAttribute(key, value.toString())
            }
        }

        this.appendChild(node, this.renderComponent(element.props.children))

        return node
    }

    appendChild(element, child) {
        if (child == null) return
        if (child instanceof Node) {
            element.appendChild(child)
        } else if (child[Symbol.iterator]) {
            for (const node of child) {
                this.appendChild(element, node)
            }
        } else {
            throw new Error("invalid child")
        }
    }
}
