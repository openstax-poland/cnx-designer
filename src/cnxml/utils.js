import { List } from 'immutable'

/**
 * Create transformer function for nodes containing just text.
 */
export const text = type => (el, next) => splitBlocks({
    type: type,
    nodes: next(el.childNodes),
})


/**
 * One of CNXML's quirks is that it allows certain block elements inside runs
 * of text, which is both silly and not supported by Slate. This function
 * normalizes such cases by moving those nested blocks out, splitting the text
 * block when necessary.
 */
export function splitBlocks(node) {
    if (node.nodes.every(node => node.object !== 'block')) {
        return node
    }

    const res = []

    let nodes = []
    let start = 0

    for (const child of node.nodes) {
        if (child.object !== 'block') {
            nodes.push(child)
            continue
        }

        if (nodes.length > 0) {
            res.push({ ...node, nodes })
            nodes = []
        }

        res.push(child)
    }

    if (nodes.length > 0) {
        res.push({ ...node, nodes })
    }

    return res
}


/**
* Return element's classes as an array.
*/
export const loadClasses = (el) => {
    const classes = el.getAttribute('class')

    if (!classes) return List([])

    return List(classes.trim().split(/\s+/))
}
