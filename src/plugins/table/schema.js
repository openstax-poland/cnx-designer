// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

const ALIGN_OPTIONS = [
    'left',
    'right',
    'center',
    'justify',
    'char',
]

const FRAME_OPTIONS = [
    'all',
    'sides',
    'top',
    'bottom',
    'topbot',
    'none',
]

const VALIGN_OPTIONS = [
    'top',
    'middle',
    'bottom',
]

const alignValidation = a => a == null || ALIGN_OPTIONS.includes(a)
const charoffValidation = c => c == null || typeof c === 'number'
const charValidation = c => c == null || typeof c === 'string'
const colsepValidation = c => c == null || typeof c === 'number'
const colsValidation = c => typeof c === 'number' && c > 0
const frameValidation = f => f == null || FRAME_OPTIONS.includes(f)
const pgwideValidation = p => p == null || typeof p === 'number'
const rowsepValidation = r => r == null || typeof r === 'number'
const summaryValidation = s => typeof s === 'string'
const valignValidation = va => va == null || VALIGN_OPTIONS.includes(va)

function moveNodeBeforeParent(change, node) {
    console.log('moveNodeBeforeParent')
    const document = change.value.document
    const parent = document.getParent(node.key)
    const grandParent = document.getParent(parent.key) || document
    const parentIndex = grandParent.nodes.findIndex(n => n.key === parent.key)
    const newIndexForNode = parentIndex
    console.log('parent', parent.type, 'grandParent', grandParent.object, 'newIndexForNode', newIndexForNode)
    change.moveNodeByKey(node.key, grandParent.key, newIndexForNode)
}

function normalizeTable(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeTable', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_min_invalid': {
        // Missing table_tgroup
        if (index === 0) {
            const tgroup = node.nodes.find(n => n.type === 'table_tgroup')
            if (!tgroup) {
                // If it doesn't exists then just remove table
                change.removeNodeByKey(node.key)
                return
            }
            // Move it at the beginning
            change.moveNodeByKey(tgroup.key, node.key, 0)
            return
        } else if (index === node.nodes.size) {
            // Missing table_summary
            const summary = node.nodes.find(n => n.type === 'table_summary')
            // If it doesn't exists just create new
            if (!summary) {
                const newSummary = Block.create({
                    type: 'table_summary',
                    nodes: [Text.create(node.data.get('summary') || '')],
                })
                change.insertNodeByKey(
                    node.key, node.nodes.size, newSummary)
                return
            } else if (node.nodes.last().key !== summary.key) {
                // If it does and is not last then move it to the end
                change.moveNodeByKey(summary.key, node.key, node.nodes.size)
                return
            }
        }

        console.warn('Unhandled table violation:', violation)
        break
    }

    case 'child_type_invalid':
        // Some nodes might be at wrong index
        if (child.type === 'title') {
            change.moveNodeByKey(child.key, node.key, 0)
            return
        } else if (child.type === 'table_caption') {
            change.moveNodeByKey(child.key, node.key, node.nodes.size - 2)
            return
        } else if (child.type === 'table_summary') {
            change.moveNodeByKey(child.key, node.key, node.nodes.size)
            return
        }

        moveNodeBeforeParent(change, child)
        break

        // console.warn('Unhandled table violation:', violation)
        // break

    default:
        console.warn('Unhandled table violation:', violation)
        break
    }
}

function normalizeTsummary(change, error) {
    console.warn('Unhandled tsummary violation:', error.code)
}

function normalizeTgroup(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeTgroup', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_min_invalid': {
        // table_tbody is at wrong index
        const tbody = node.nodes.find(n => n.type === 'table_tbody')
        const correctIndex = node.nodes.findIndex(n => {
            if (!['table_colspec', 'table_thead'].includes(n.type)) {
                return true
            }
            return false
        })
        change.moveNodeByKey(tbody.key, node.key, correctIndex)
        return
    }

    case 'child_type_invalid':
    case 'child_unknown':
        if (child.type === 'table_colspec') {
            change.moveNodeByKey(child.key, node.key, 0)
            return
        } else if (child.type === 'table_thead') {
            const lastIndexOfColspec = node.nodes.reverse()
                .findIndex(n => n.type === 'table_colspec')

            change.moveNodeByKey(
                child.key,
                node.key,
                lastIndexOfColspec < 0 ? 0 : node.nodes.size - lastIndexOfColspec)
            return
        } else if (child.type === 'table_tfoot') {
            change.moveNodeByKey(child.key, node.key, node.nodes.size)
            return
        }

        moveNodeBeforeParent(change, child)
        break
        // console.warn('Unhandled tgroup violation:', error.code)
        // break

    case 'node_data_invalid':
        if (key === 'cols' && Number(value) > 0) {
            change.setNodeByKey(node.key, {
                data: node.data.set('cols', Number(value)),
            })
            return
        }

        console.warn('Unhandled tgroup violation:', error.code)
        break

    default:
        console.warn('Unhandled tgroup violation:', error.code)
        break
    }
}

function normalizeColspec(change, error) {
    console.warn('Unhandled colspec violation:', error.code)
}

function normalizeSpanspec(change, error) {
    console.warn('Unhandled spanspec violation:', error.code)
}

function normalizeThead(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeThead', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_type_invalid':
        moveNodeBeforeParent(change, child)
        break

    default:
        console.warn('Unhandled thead violation:', error.code)
        break
    }
}

function normalizeTbody(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeTbody', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_type_invalid':
        moveNodeBeforeParent(change, child)
        break

    default:
        console.warn('Unhandled tbody violation:', error.code)
        break
    }
}

function normalizeTfoot(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeTfoot', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_type_invalid':
        moveNodeBeforeParent(change, child)
        break

    default:
        console.warn('Unhandled tfoot violation:', error.code)
        break
    }
}

function normalizeRow(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeRow', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_type_invalid':
        moveNodeBeforeParent(change, child)
        break

    default:
        console.warn('Unhandled row violation:', error.code)
        break
    }
}

function normalizeEntry(change, error) {
    const { code: violation, child, index, key, value, node } = error
    console.log('normalizeEntry', violation, 'index', index, 'child', child ? child.type : null, 'key', key, 'value', value, 'nodes', node ? node.toJS().nodes.map(n => n.type) : node)

    switch (violation) {
    case 'child_min_invalid':
        change.insertNodeByKey(node.key, {
            object: 'block',
            type: 'paragraph',
        })
        break

    case 'child_type_invalid': {
        if (child.object === 'text') {
            change.wrapNodeByKey(child.key, {
                object: 'block',
                type: 'paragraph',
            })
            return
        }
        if (child.nodes.some(n => n.object === 'block')) {
            const path = change.value.document.getPath(child.key)
            change.unwrapChildrenByPath(path)
            return
        }
        change.setNodeByKey(child.key, { type: 'paragraph' })
        break
    }

    default:
        console.warn('Unhandled entry violation:', error.code)
        break
    }
}

function normalizeCaption(change, error) {
    console.warn('Unhandled caption violation:', error.code)
}

export default function make_schema({ inlines, entry_types }) {
    return {
        blocks: {
            table: {
                data: {
                    summary: summaryValidation,
                    frame: frameValidation,
                    colsep: colsepValidation,
                    rowsep: rowsepValidation,
                    pgwide: pgwideValidation,
                },
                nodes: [
                    { match: { type: 'title' }, min: 0, max: 1 },
                    { match: { type: 'table_tgroup' }, min: 1 },
                    { match: { type: 'table_caption' }, min: 0, max: 1 },
                    { match: { type: 'table_summary' }, min: 1, max: 1 },
                ],
                normalize: normalizeTable,
            },
            table_summary: {
                nodes: [{
                    match: [
                        ...inlines.map(type => ({ type })),
                        { object: 'text' },
                    ],
                }],
                normalize: normalizeTsummary,
            },
            table_tgroup: {
                data: {
                    cols: colsValidation,
                    colsep: colsepValidation,
                    rowsep: rowsepValidation,
                    align: alignValidation,
                    char: charValidation,
                    charoff: charoffValidation,
                },
                nodes: [
                    { match: { type: 'table_colspec' }, min: 0 },
                    { match: { type: 'table_thead' }, min: 0, max: 1 },
                    { match: { type: 'table_tbody' }, min: 1, max: 1 },
                    { match: { type: 'table_tfoot' }, min: 0, max: 1 },
                ],
                normalize: normalizeTgroup,
            },
            table_colspec: {
                isVoid: true,
                // Temporarily allow all of those attributes until
                // we decide how to handle cells merging.
                data: {
                    colnum: () => true,
                    colname: () => true,
                    colwidth: () => true,
                    colsep: () => true,
                    rowsep: () => true,
                    align: () => true,
                    char: () => true,
                    charoff: () => true,
                },
                normalize: normalizeColspec,
            },
            table_spanspec: {
                isVoid: true,
                // Temporarily allow all of those attributes until
                // we decide how to handle cells merging.
                data: {
                    namest: () => true,
                    nameend: () => true,
                    spanname: () => true,
                    colsep: () => true,
                    rowsep: () => true,
                    align: () => true,
                    char: () => true,
                    charoff: () => true,
                },
                normalize: normalizeSpanspec,
            },
            table_thead: {
                data: {
                    valign: valignValidation,
                },
                nodes: [
                    { match: { type: 'table_colspec' } },
                    { match: { type: 'table_row' } },
                ],
                normalize: normalizeThead,
            },
            table_tbody: {
                data: {
                    valign: valignValidation,
                },
                nodes: [
                    { match: { type: 'table_row' } },
                ],
                normalize: normalizeTbody,
            },
            table_tfoot: {
                data: {
                    valign: valignValidation,
                },
                nodes: [
                    { match: { type: 'table_colspec' } },
                    { match: { type: 'table_row' } },
                ],
                normalize: normalizeTfoot,
            },
            table_row: {
                data: {
                    valign: valignValidation,
                    rowsep: rowsepValidation,
                },
                nodes: [
                    { match: { type: 'table_entry' } },
                ],
                normalize: normalizeRow,
            },
            table_entry: {
                data: {
                    // Temporarily allow those attributes until
                    // we decide how to handle cells merging.
                    morerows: () => true,
                    colname: () => true,
                    namest: () => true,
                    nameend: () => true,
                    spanname: () => true,
                    colsep: colsepValidation,
                    rowsep: rowsepValidation,
                    align: alignValidation,
                    char: charValidation,
                    charoff: charoffValidation,
                    valign: valignValidation,
                },
                nodes: [{
                    match: entry_types.map(type => ({ type })),
                    min: 1,
                }],
                normalize: normalizeEntry,
            },
            table_caption: {
                nodes: [{
                    match: [
                        ...inlines.map(type => ({ type })),
                        { object: 'text' },
                    ],
                }],
                normalize: normalizeCaption,
            },
        },
    }
}
