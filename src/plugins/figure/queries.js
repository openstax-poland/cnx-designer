export function getCounterDefinitions(editor, definitions) {
    definitions.push({
        figure: {
            figure: 'enter',
        },
    })
}

/**
 * Find the inner-most selected figure.
 *
 * @param {Slate~Editor} value
 *
 * @return {Slate~Block|null}
 */
export function getActiveFigure(editor, value) {
    const { document, blocks } = value

    if (!blocks.first()) {
        return null
    }

    const path = document.getPath(blocks.first().key)

    let figure = null
    let node = document
    for (const index of path) {
        node = node.getNode([index])

        if (node.type === 'figure') {
            figure = node
        }
    }

    return figure
}
