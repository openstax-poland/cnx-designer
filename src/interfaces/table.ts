// Copyright 2024 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { isPlainObject } from 'is-plain-object'
import { Editor, Element, Path } from 'slate'

import { enumerate } from '../util'

/**
 * A table
 *
 * Allowed children are, in order
 * - {@link Title} (optional)
 * - {@link TableGroup} (repeatable, at least one)
 * - {@link Caption} (optional)
 */
export interface Table extends Element {
    type: 'table'
}

/**
 * Portion of a table
 *
 * Allowed children are, in order
 * - {@link TableHeader} (optional)
 * - {@link TableRow} (repeatable)
 * - {@link TableFooter} (optional)
 */
export interface TableGroup extends Element {
    type: 'table_group'
    /** Columns defined in this group */
    columns: TableColumn[]
    /** Column spans defined in this group */
    spans: TableSpan[]
}

/** Definition of a column in a {@link TableGroup} */
export type TableColumn = {
    /** Unique name assigned to this column */
    name: string | null,
}

/** Definition of a span of columns in a {@link TableGroup} */
export type TableSpan = {
    /** Unique name assigned to this span */
    name: string,
    /** Name of the first column in this span */
    start: string,
    /** Name of the last column in this span */
    end: string,
}

export type ColumnSet = {
    /** Column definitions by index */
    columns: TableColumn[],
    /** Mapping from column name to index */
    columnNames: { [name: string]: number },
    /** Span definitions by name */
    spans: { [name: string]: TableSpan },
}

/** {@link Rows TableRow} displayed above a table, once per page */
export interface TableHeader extends Element {
    type: 'table_header'
    /** Columns redefined for this header */
    columns?: TableColumn[]
}

/** {@link Rows TableRow} displayed below a table, once per page */
export interface TableFooter extends Element {
    type: 'table_footer'
    /** Columns redefined for this footer */
    columns?: TableColumn[],
}

/** Row of a table */
export interface TableRow extends Element {
    type: 'table_row',
}

/** Cell of a table */
export interface TableCell extends Element {
    type: 'table_cell',
    /** Column position specification */
    column?: ColumnPosition,
    /** Number of rows taken by this cell, if different than one */
    rows?: number,
}

/** Column position specification */
export type ColumnPosition =
    /** At named column */
    | { column: string }
    /** Span between named columns */
    | { start: string, end: string }
    /** At named span */
    | { span: string }

export const Table = {
    /** Check if value of unknown type is a table */
    isTable(this: void, value: unknown): value is Table {
        return Element.isElement(value) && value.type === 'table'
    },

    /** Check if value of unknown type is a table group */
    isGroup(this: void, value: unknown): value is TableGroup {
        return Element.isElement(value) && value.type === 'table_group'
    },

    /** Check if value of unknown type is a table header */
    isHeader(this: void, value: unknown): value is TableHeader {
        return Element.isElement(value) && value.type === 'table_header'
    },

    /** Check if value of unknown type is a table footer */
    isFooter(this: void, value: unknown): value is TableFooter {
        return Element.isElement(value) && value.type === 'table_footer'
    },

    /** Check if value of unknown type is a table header or footer */
    isHeaderOrFooter(this: void, value: unknown): value is TableHeader | TableFooter {
        return Element.isElement(value)
            && (value.type === 'table_header' || value.type === 'table_footer')
    },

    /** Check if value of unknown type is a table row */
    isRow(this: void, value: unknown): value is TableRow {
        return Element.isElement(value) && value.type === 'table_row'
    },

    /** Check if value of unknown type is a table cell */
    isCell(this: void, value: unknown): value is TableCell {
        return Element.isElement(value) && value.type === 'table_cell'
    },

    /** Check if value of unknown type is a cell column position specification */
    isColumnPosition(this: void, value: unknown): value is ColumnPosition {
        return value == null || (isPlainObject(value) && (
            typeof (value as any).column === 'string'
            || (typeof (value as any).start === 'string' && typeof (value as any).end === 'string')
            || typeof (value as any).span === 'string'
        ))
    },

    /** Get set of columns in use at a location */
    columns(this: void, editor: Editor, at: Path): ColumnSet {
        const [l1] = Editor.levels(editor, { at, reverse: true, match: Table.isGroup })
        const [group] = l1 ?? []
        if (group == null) {
            return { columns: [], columnNames: {}, spans: {} }
        }

        const set: ColumnSet = {
            columns: group.columns,
            columnNames: {},
            spans: {},
        }

        const [l2] = Editor.levels(editor, { at, reverse: true, match: Table.isHeaderOrFooter })
        const [part] = l2 ?? []

        if (part != null && part.columns != null) {
            set.columns = part.columns
        } else {
            for (const span of group.spans) {
                set.spans[span.name] = span
            }
        }

        for (const [inx, column] of enumerate(set.columns)) {
            if (column.name != null) {
                set.columnNames[column.name] = inx
            }
        }

        return set
    }
}
