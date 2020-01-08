// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function getCounterDefinitions(editor, definitions) {
    definitions.push({
        rule: {
            rule: 'enter',
            rule_statement: 'enclose',
            rule_proof: 'enclose',
            rule_example: 'enclose',
        },
        rule_statement: {
            rule_statement: 'enter',
        },
        rule_proof: {
            rule_proof: 'enter',
        },
        rule_example: {
            rule_example: 'enter',
        },
    })
}

export function getActiveRule(editor, value) {
    const { document, blocks } = value
    const first = blocks.first()

    // No selection
    if (!first) return null

    const path = document.getPath(first.key)

    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === 'rule') {
            return node
        }
    }

    return null
}
