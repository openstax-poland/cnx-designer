// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeTable(change, error) {
    const { code: violation, child } = error

    switch (violation) {
        case 'child_type_invalid':
            console.log('child_type_invalid')
            console.log('child.type:', child.type)
            if (child.type === 'title') {
                change.setNodeByKey(child.key, { type: 'caption' })
            } else {
                console.warn('Unhandled table violation:', violation, JSON.stringify(error, null, 2))
            }
            break

        default:
            console.warn('Unhandled table violation:', violation)
            break
    }
}

function normalizeTgroup(change, error) {
    console.warn('Unhandled tgroup violation:', error.code)
}

function normalizeColspec(change, error) {
    console.warn('Unhandled colspec violation:', error.code)
}

function normalizeSpanspec(change, error) {
    console.warn('Unhandled spanspec violation:', error.code)
}

function normalizeThead(change, error) {
    console.warn('Unhandled thead violation:', error.code)
}

function normalizeTbody(change, error) {
    console.warn('Unhandled tbody violation:', error.code)
}

function normalizeTfoot(change, error) {
    console.warn('Unhandled tfoot violation:', error.code)
}

function normalizeRow(change, error) {
    console.warn('Unhandled row violation:', error.code)
}

function normalizeEntry(change, error) {
    console.warn('Unhandled entry violation:', error.code)
}

function normalizeCaption(change, error) {
    console.warn('Unhandled caption violation:', error.code)
}

export default {
    blocks: {
        table: {
            data: {
                summary: s => s == null || typeof s === 'string',
                frame: f => f == null || typeof f === 'string',
                colsep: c => c == null || c >= 0,
                rowsep: r => r == null || r >= 0,
                pgwide: p => p == null || p >= 0,
            },
            nodes: [
                { match: { type: 'caption' }, min: 0, max: 1, },
                { match: { type: 'tgroup' }, min: 1, },
                { match: { type: 'caption' }, min: 0, max: 1, },
            ],
            normalize: normalizeTable,
        },
        tgroup: {
            data: {
                cols: c => c == null || c > 0,
                colsep: c => c == null || c >= 0,
                rowsep: r => r == null || r >= 0,
                align: a => a == null || typeof a === 'string',
                char: c => c == null || typeof c === 'string',
                charoff: c => c == null || 0 >= c && c <= 100,
            },
            nodes: [
                { match: { type: 'colspec' } },
                { match: { type: 'thead' }, min: 0, },
                { match: { type: 'tbody' }, min: 1, max: 1, },
                { match: { type: 'tfoot' }, min: 0, },
            ],
            normalize: normalizeTgroup,
        },
        colspec: {
            isVoid: true,
            data: {
                colnum: c => c == null || c > 0,
                colname: c => c == null || typeof c === 'string',
                colwidth: c => c == null || typeof c === 'string',
                colsep: c => c == null || c >= 0,
                rowsep: r => r == null || r >= 0,
                align: a => a == null || typeof a === 'string',
                char: c => c == null || typeof c === 'string',
                charoff: c => c == null || 0 >= c && c <= 100,
            },
            normalize: normalizeColspec,
        },
        spanspec: {
            isVoid: true,
            data: {
                namest: n => n == null || typeof n === 'string',
                nameend: n => n == null || typeof n === 'string',
                spanname: s => s == null || typeof s === 'string',
                colsep: c => c == null || c >= 0,
                rowsep: r => r == null || r >= 0,
                align: a => a == null || typeof a === 'string',
                char: c => c == null || typeof c === 'string',
                charoff: c => c == null || 0 >= c && c <= 100,
            },
            normalize: normalizeSpanspec,
        },
        thead: {
            data: {
                valign: v => v == null || typeof v === 'string',
            },
            nodes: [
                { match: { type: 'colspec' } },
                { match: { type: 'row' } },
            ],
            normalize: normalizeThead,
        },
        tbody: {
            data: {
                valign: v => v == null || typeof v === 'string',
            },
            nodes: [
                { match: { type: 'row' } },
            ],
            normalize: normalizeTbody,
        },
        tfoot: {
            data: {
                valign: v => v == null || typeof v === 'string',
            },
            nodes: [
                { match: { type: 'colspec' } },
                { match: { type: 'row' } },
            ],
            normalize: normalizeTfoot,
        },
        row: {
            data: {
                valign: v => v == null || typeof v === 'string',
                rowsep: r => r == null || r >= 0,
            },
            nodes: [
                { match: { type: 'entry' } },
            ],
            normalize: normalizeRow,
        },
        entry: {
            data: {
                morerows: m => m == null || m >= 0,
                colname: c => c == null || typeof c === 'string',
                namest: n => n == null || typeof n === 'string',
                nameend: n => n == null || typeof n === 'string',
                spanname: s => s == null || typeof s === 'string',
                colsep: c => c == null || c >= 0,
                rowsep: r => r == null || r >= 0,
                align: a => a == null || typeof a === 'string',
                char: c => c == null || typeof c === 'string',
                charoff: c => c == null || 0 >= c && c <= 100,
                valign: v => v == null || typeof v === 'string',
            },
            normalize: normalizeEntry,
        },
        caption: {
            normalize: normalizeCaption,
        },
    },
}