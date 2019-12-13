// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block } from 'slate'

/**
 * Insert table.
 *
 * @param {Slate~Change} change
 * @param {object} options
 */
export function insertTable(change, options) {
    const {
        columns = 2,
        rows = 1,
    } = options

    if (columns < 1 || rows < 1) {
        console.error('columns and rows options should be grater than 0')
        return false
    }

    const tbody = {
        object: 'block',
        type: 'table_tbody',
        nodes: [],
    }

    for (let i = 0; i < rows; i++) {
        const row = {
            object: 'block',
            type: 'table_row',
            nodes: [],
        }

        for (let i = 0; i < columns; i++) {
            row.nodes.push({
                object: 'block',
                type: 'table_entry',
                nodes: [],
            })
        }

        tbody.nodes.push(row)
    }

    const tgroup = {
        object: 'block',
        type: 'table_tgroup',
        data: {
            cols: columns,
        },
        nodes: [tbody],
    }

    const table = Block.create({
        type: 'table',
        data: {
            summary: '',
        },
        nodes: [tgroup],
    })

    const entryToSelect = table.findDescendant(n => n.type === 'table_entry')
    change.insertBlock(table).moveTo(entryToSelect.key)
    return true
}

/**
 * Insert column at @param index in selected table.
 *
 * @param {Slate~Change} change
 * @param {number} index
 */
export function insertColumnAtIndex(change, index = 0) {
    const tgroup = change.getActiveTableNode('table_tgroup')
    if (!tgroup) return false

    const tbody = change.getActiveTableNode('table_tbody')
    const thead = change.getActiveTableNode('table_thead')
    const tfoot = change.getActiveTableNode('table_tfoot')

    change.withoutNormalizing(() => {
        for (const row of tbody.nodes) {
            const entry = Block.create({
                type: 'table_entry',
                nodes: [{ object: 'block', type: 'paragraph' }],
            })
            change.insertNodeByKey(row.key, index, entry)
        }

        if (thead) {
            for (const row of thead.nodes) {
                const entry = Block.create({
                    type: 'table_entry',
                    nodes: [{ object: 'block', type: 'paragraph' }],
                })
                change.insertNodeByKey(row.key, index, entry)
            }
        }

        if (tfoot) {
            for (const row of tfoot.nodes) {
                const entry = Block.create({
                    type: 'table_entry',
                    nodes: [{ object: 'block', type: 'paragraph' }],
                })
                change.insertNodeByKey(row.key, index, entry)
            }
        }

        change.setNodeByKey(tgroup.key, {
            data: tgroup.data.set('cols', Number(tgroup.data.get('cols')) + 1),
        })
    })

    return true
}

/**
 * Insert column before or after current column.
 *
 * @param {Slate~Change} change
 * @param {before|after} [position=after]
 */
export function insertColumn(change, position = 'after') {
    const tgroup = change.getActiveTableNode('table_tgroup')
    const tbody = change.getActiveTableNode('table_tbody')
    const thead = change.getActiveTableNode('table_thead')
    const tfoot = change.getActiveTableNode('table_tfoot')
    const currRow = change.getActiveTableNode('table_row')
    const currEntry = change.getActiveTableNode('table_entry')
    if (!tgroup || !tbody || !currRow || !currEntry) return false

    const currEntryIndex = currRow.nodes.findIndex(e => e.key === currEntry.key)
    const indexForNewEntry = position === 'after'
        ? currEntryIndex + 1
        : currEntryIndex

    change.withoutNormalizing(() => {
        tbody.nodes.forEach(row => {
            const entry = Block.create({
                type: 'table_entry',
                nodes: [{ object: 'block', type: 'paragraph' }],
            })
            change.insertNodeByKey(
                row.key,
                indexForNewEntry,
                entry)
        })

        if (thead) {
            thead.nodes.forEach(row => {
                const entry = Block.create({
                    type: 'table_entry',
                    nodes: [{ object: 'block', type: 'paragraph' }],
                })
                change.insertNodeByKey(
                    row.key,
                    indexForNewEntry,
                    entry)
            })
        }

        if (tfoot) {
            tfoot.nodes.forEach(row => {
                const entry = Block.create({
                    type: 'table_entry',
                    nodes: [{ object: 'block', type: 'paragraph' }],
                })
                change.insertNodeByKey(
                    row.key,
                    indexForNewEntry,
                    entry)
            })
        }

        change.setNodeByKey(tgroup.key, {
            data: tgroup.data.set('cols', currRow.nodes.size + 1),
        })
    })

    const entryToSelect = change.value.document.getNode(currRow.key)
        .nodes.get(indexForNewEntry)
    change.moveTo(entryToSelect.key)
    return true
}

/**
 * Insert row before or after @param refRow or current row.
 *
 * @param {Slate~Change} change
 * @param {Slate~Block}  [refRow=null]
 * @param {before|after} [position=after]
 */
export function insertRow(change, refRow = null, position = 'after') {
    const table = change.getActiveTableNode('table')
    const currRow = refRow || change.getActiveTableNode('table_row')
    if (!table || !currRow) return false

    const newRowData = {
        object: 'block',
        type: 'table_row',
        nodes: [],
    }
    for (let i = 0; i < currRow.nodes.size; i++) {
        newRowData.nodes.push({
            object: 'block',
            type: 'table_entry',
            nodes: [],
        })
    }
    const newRow = Block.create(newRowData)

    const parent = table.getParent(currRow.key)
    const currRowIndex = parent.nodes.findIndex(row => row.key === currRow.key)

    const entryToSelect = newRow.findDescendant(n => n.type === 'table_entry')
    change.insertNodeByKey(
        parent.key,
        position === 'after' ? currRowIndex + 1 : currRowIndex,
        newRow)
        .moveTo(entryToSelect.key)

    return true
}

/**
 * Remove table column.
 *
 * @param {Slate~Change} change
 */
export function removeColumn(change) {
    const tgroup = change.getActiveTableNode('table_tgroup')
    const tbody = change.getActiveTableNode('table_tbody')
    const thead = change.getActiveTableNode('table_thead')
    const tfoot = change.getActiveTableNode('table_tfoot')
    const row = change.getActiveTableNode('table_row')
    const entry = change.getActiveTableNode('table_entry')
    if (!tgroup || !tbody || !row || !entry) return false

    const entryIndex = row.nodes.findIndex(n => n.key === entry.key)

    change.withoutNormalizing(() => {
        tbody.nodes.forEach(row => {
            change.removeNodeByKey(row.nodes.get(entryIndex).key)
        })

        if (thead) {
            thead.nodes.forEach(row => {
                change.removeNodeByKey(row.nodes.get(entryIndex).key)
            })
        }

        if (tfoot) {
            tfoot.nodes.forEach(row => {
                change.removeNodeByKey(row.nodes.get(entryIndex).key)
            })
        }

        change.setNodeByKey(tgroup.key, {
            data: tgroup.data.set('cols', row.nodes.size - 1),
        })
    })

    let entryToSelect = null
    if (entryIndex < row.nodes.size - 1) {
        entryToSelect = row.nodes.get(entryIndex + 1)
    } else {
        entryToSelect = row.nodes.get(entryIndex - 1)
    }

    change.moveTo(entryToSelect.key)
    return true
}

/**
 * Remove table row.
 *
 * @param {Slate~Change} change
 */
export function removeRow(change) {
    const tgroup = change.getActiveTableNode('table_tgroup')
    const row = change.getActiveTableNode('table_row')
    if (!tgroup || !row) return false

    change.removeNodeByKey(row.key)

    let entryToSelect = null
    const nextRow = tgroup.getNextSibling(row.key)
    if (nextRow) {
        entryToSelect = nextRow.findDescendant(n => n.type === 'table_entry')
    } else {
        const prevRow = tgroup.getPreviousSibling(row.key)
        entryToSelect = prevRow.findDescendant(n => n.type === 'table_entry')
    }

    if (entryToSelect) {
        change.moveTo(entryToSelect.key)
    }

    return true
}

/**
 * Insert table_thead.
 *
 * @param {Slate~Change} change
 */
export function insertThead(change) {
    const tgroup = change.getActiveTableNode('table_tgroup')
    if (!tgroup) return false

    const theadData = {
        object: 'block',
        type: 'table_thead',
        nodes: [{
            object: 'block',
            type: 'table_row',
            nodes: [],
        }],
    }

    const cols = tgroup.data.get('cols') || 1
    for (let i = 0; i < cols; i++) {
        theadData.nodes[0].nodes.push({
            object: 'block',
            type: 'table_entry',
            nodes: [{ object: 'block', type: 'paragraph' }],
        })
    }

    const thead = Block.create(theadData)
    change.insertNodeByKey(tgroup, 0, thead)
    // Move cursor to first entry in thead
    const entryToSelect = thead.findDescendant(n => n.type === 'table_entry')
    change.moveTo(entryToSelect.key)
    return true
}

/**
 * Remove table_thead.
 *
 * @param {Slate~Change} change
 */
export function removeThead(change) {
    const tbody = change.getActiveTableNode('table_tbody')
    const thead = change.getActiveTableNode('table_thead')
    if (!tbody || !thead) return false

    change.removeNodeByKey(thead.key)
    // Move cursor to first entry in tbody after removing thead
    const entryToSelect = tbody.nodes.first().nodes.first()
    change.moveTo(entryToSelect.key)
    return true
}

/**
 * Insert table_tfoot.
 *
 * @param {Slate~Change} change
 */
export function insertTfoot(change) {
    const tgroup = change.getActiveTableNode('table_tgroup')
    if (!tgroup) return false

    const tfootData = {
        object: 'block',
        type: 'table_tfoot',
        nodes: [{
            object: 'block',
            type: 'table_row',
            nodes: [],
        }],
    }

    const cols = tgroup.data.get('cols') || 1
    for (let i = 0; i < cols; i++) {
        tfootData.nodes[0].nodes.push({
            object: 'block',
            type: 'table_entry',
            nodes: [{ object: 'block', type: 'paragraph' }],
        })
    }

    const tfoot = Block.create(tfootData)
    change.insertNodeByKey(tgroup, tgroup.nodes.size, tfoot)
    // Move cursor to first entry in tfoot
    const entryToSelect = tfoot.findDescendant(n => n.type === 'table_entry')
    change.moveTo(entryToSelect.key)
    return true
}

/**
 * Remove table_tfoot.
 *
 * @param {Slate~Change} change
 */
export function removeTfoot(change) {
    const tbody = change.getActiveTableNode('table_tbody')
    const tfoot = change.getActiveTableNode('table_tfoot')
    if (!tbody || !tfoot) return false

    change.removeNodeByKey(tfoot.key)
    // Move curstor to last entry in tbody after removing tfoot
    const entryToSelect = tbody.nodes.last().nodes.last()
    change.moveTo(entryToSelect.key)
    return true
}

/**
 * Insert table_caption.
 *
 * @param {Slate~Change} change
 */
export function insertTableCaption(change) {
    const table = change.getActiveTableNode('table')
    if (!table) return false

    const caption = change.getActiveTableNode('table_caption')
    if (caption) {
        change.moveTo(caption.key)
        return true
    }

    const newCaption = Block.create('table_caption')
    change.insertNodeByKey(table.key, table.nodes.size - 1, newCaption)
        .moveTo(newCaption.key)
    return true
}

/**
 * Remove table_caption.
 *
 * @param {Slate~Change} change
 */
export function removeTableCaption(change) {
    const caption = change.getActiveTableNode('table_caption')
    if (!caption) return false

    change.removeNodeByKey(caption.key)
        .moveTo(change.getActiveTableNode('table_summary').key)
    return true
}
