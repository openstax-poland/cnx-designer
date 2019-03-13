import AssertionError from 'assertion-error'

class HtmlError extends AssertionError {
    constructor(path, message, actual, expected) {
        super('At ' + path + ': ' + message, {
            expected,
            actual,
            path,
            showDiff: true,
        })
    }
}

export default function compareHtml(dom, a, b, path='') {
    if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
        throw new HtmlError(path,
            'different node types',
            Object.getPrototypeOf(a).constructor.name,
            Object.getPrototypeOf(b).constructor.name)
    }

    if (a instanceof dom.window.Text) {
        if (a.wholeText !== b.wholeText) {
            throw new HtmlError(
                path, 'text nodes differ', a.wholeText, b.wholeText)
        }
    } else if (a instanceof dom.window.Element) {
        // Compare namespace and local name
        if (a.namespaceURI !== b.namespaceURI || a.localName !== b.localName) {
            throw new HtmlError(
                path,
                'elements differ',
                (a.namespaceURI ? '{' + a.namespaceURI + '}' : '') + a.localName,
                (b.namespaceURI ? '{' + b.namespaceURI + '}' : '') + b.localName,
            )
        }

        path += '/' + (a.prefix ? a.prefix + ':' : '') + a.localName

        // Compare attributes
        for (const attrA of a.attributes) {
            const attrB = b.attributes.getNamedItemNS(
                attrA.namespaceURI, attrA.localName)

            let apath = path + '/@'
                    + (attrA.namespaceURI == null
                        ? ''
                        : '{' + attrA.namespaceURI + '}')
                    + attrA.localName

            if (attrB == null) {
                throw new HtmlError(
                    apath, 'unexpected attribute', attrA.value, null)
            }

            if (attrA.value !== attrB.value) {
                throw new HtmlError(
                    apath, 'attribute values differ', attrA.value, attrB.value)
            }
        }

        // Find missing attributes
        for (const attrB of b.attributes) {
            const attrA = a.attributes.getNamedItemNS(
                attrB.namespaceURI, attrB.localName)

            if (attrA == null) {
                let apath = path + '/@'
                    + (attrB.namespaceURI == null ? '' : '{' + attrB.namespaceURI + '}')
                    + attrB.localName
                throw new HtmlError(
                    apath, 'attributes differ', 'unset', attrB.value)
            }
        }

        // Compare children

        const childrenA = normalizeChildren(a)
        const childrenB = normalizeChildren(b)

        if (childrenA.length !== childrenB.length) {
            throw new HtmlError(
                path,
                'elements have different children',
                makeDiff(childrenA),
                makeDiff(childrenB),
            )
        }

        for (let inx = 0 ; inx < childrenA.length ; ++inx) {
            const childA = childrenA[inx]
            const childB = childrenB[inx]
            compareHtml(dom, childA, childB, path + '[' + inx + ']')
        }
    } else {
        throw new Error(path + ': Trying to compare unsupported type '
            + Object.getPrototypeOf(a).constructor.name)
    }
}

const BLOCK_NODES = [
    'commentary',
    'content',
    'exercise',
    'figure',
    'list',
    'media',
    'problem',
    'section',
    'solution',
    'subfigure',
]

const MIXED_NODES = [
    'item',
    'note',
]

const INLINE_NODES = [
    'emphasis',
    'footnote',
    'foreign',
    'link',
    'sub',
    'sup',
]

/**
 * Normalizes children nodes before comparison.
 *
 * @param {Element} element
 *
 * @return {Node[]}
 */
function normalizeChildren(element) {
    if (BLOCK_NODES.includes(element.localName)) {
        return element.children
    }

    const children = []
    const isMixed = MIXED_NODES.includes(element.localName)

    let first = true
    let onlyBlocks = false

    for (const node of element.childNodes) {
        if (node.nodeType === 3 && node.wholeText.match(/^\s*$/) && first) {
            continue
        } else if (
            node.nodeType === 1
            && first
            && isMixed
            && !INLINE_NODES.includes(node.localName)
        ) {
            onlyBlocks = true
        } else if (node.nodeType === 3 && onlyBlocks) {
            continue
        }

        first = false

        children.push(node)
    }

    while (children.length > 0) {
        const last = children[children.length - 1]

        if (last.nodeType === 3 && last.wholeText.match(/^\s*$/)) {
            children.pop()
        } else {
            break
        }
    }

    return children
}

/**
 * Create a simplified list of children nodes for use in diffs for failed
 * assertions.
 *
 * @param {Node[]} children
 *
 * @return {string}
 */
function makeDiff(children) {
    return children.map(node => {
        switch (node.nodeType) {
        case 1:
            if (node.namespaceURI) {
                return '{' + node.namespaceURI + '}' + node.localName
            }
            return node.localName

        case 3:
            return '#text "'
                + node.wholeText.replace('"', '\\"').replace('\n', '\\n')
                + '"'

        default:
            throw new Error(
                "Cannot create diff out of node type " + node.nodeType)
        }
    }).join('\n')
}
