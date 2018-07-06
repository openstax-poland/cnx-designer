/**
 * Find the inner-most selected figure.
 *
 * @param {Slate~Value} value
 *
 * @return {Slate~Block|null}
 */
export function findFigure(value) {
    const { document, blocks } = value

    if (!blocks.first()) {
        return null
    }

    const path = document.getPath(blocks.first().key)

    let figure = null
    let node = document
    for (const index of path) {
        node = node.getNodeAtPath([index])

        if (node.type === 'figure') {
            figure = node
        }
    }

    return figure
}
