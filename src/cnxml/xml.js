/**
 * XML serializer, because `react-dom` enforces HTML constraints. For example,
 * React required that `<link>` tags have no children, contrary to what
 * CNXML expects.
 */

const NAMESPACES = {
    xml: 'http://www.w3.org/XML/1998/namespace',
}

const SPECIAL_PROPS = [
    'children',
]

const REACT_ELEMENT_TYPE = Symbol.for('react.element')

export default function render(tree) {
    return new Renderer().render(tree)
}

class Renderer {
    render(tree) {
        if (tree.$$typeof !== REACT_ELEMENT_TYPE) {
            throw new Error("Root of the document must be an element.")
        }

        const tag = tree.type
        this.ns = tree.props.xmlns || null

        this.doc = document.implementation.createDocument(this.ns, tag)
        const root = this.renderComponent(tree)

        const xml = new XMLSerializer().serializeToString(root)
        console.log(xml)
        return '<?xml version="1.0" encoding="utf-8"?>\n' + xml
    }

    renderComponent(component) {
        switch (component.$$typeof) {
        case REACT_ELEMENT_TYPE:
            return this.renderElement(component)

        default:
            if (typeof component === 'string') {
                return this.renderText(component)
            }

            if (component[Symbol.iterator]) {
                return Array.from(component, c => this.renderComponent(c))
            }

            console.log(component)
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
            if (SPECIAL_PROPS.includes(key)) continue;

            const r = key.match(/([a-z]+)([A-Z][a-z]*)/)
            if (r) {
                const [, prefix, attr] = r
                const ns = NAMESPACES[prefix]

                if (!ns) {
                    throw new Error(`unknown prefix ${prefix} for attribute ${key}`)
                }

                node.setAttributeNS(ns, attr.toLowerCase(), value.toString())
            } else {
                node.setAttribute(key, value.toString())
            }
        }

        for (const child of element.props.children) {
            this.appendChild(node, this.renderComponent(child))
        }

        return node
    }

    appendChild(element, child) {
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