// Copyright 2024 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { isPlainObject } from 'is-plain-object';
import { Editor, Element } from 'slate';
import { enumerate } from '../util';
export const Table = {
    /** Check if value of unknown type is a table */
    isTable(value) {
        return Element.isElement(value) && value.type === 'table';
    },
    /** Check if value of unknown type is a table summary */
    isSummary(value) {
        return Element.isElement(value) && value.type === 'table_summary';
    },
    /** Check if value of unknown type is a table group */
    isGroup(value) {
        return Element.isElement(value) && value.type === 'table_group';
    },
    /** Check if value of unknown type is a table header */
    isHeader(value) {
        return Element.isElement(value) && value.type === 'table_header';
    },
    /** Check if value of unknown type is a table footer */
    isFooter(value) {
        return Element.isElement(value) && value.type === 'table_footer';
    },
    /** Check if value of unknown type is a table header or footer */
    isHeaderOrFooter(value) {
        return Element.isElement(value)
            && (value.type === 'table_header' || value.type === 'table_footer');
    },
    /** Check if value of unknown type is a table row */
    isRow(value) {
        return Element.isElement(value) && value.type === 'table_row';
    },
    /** Check if value of unknown type is a table cell */
    isCell(value) {
        return Element.isElement(value) && value.type === 'table_cell';
    },
    /**
     * Check if value of unknown type is a cell column position specification
     */
    isColumnPosition(value) {
        return value == null || (isPlainObject(value) && (typeof value.column === 'string'
            || (typeof value.start === 'string'
                && typeof value.end === 'string')
            || typeof value.span === 'string'));
    },
    /** Get set of columns in use at a location */
    columns(editor, at) {
        const [l1] = Editor.levels(editor, { at, reverse: true, match: Table.isGroup });
        const [group] = l1 !== null && l1 !== void 0 ? l1 : [];
        if (group == null) {
            return { columns: [], columnNames: {}, spans: {} };
        }
        const set = {
            columns: group.columns,
            columnNames: {},
            spans: {},
        };
        const [l2] = Editor.levels(editor, { at, reverse: true, match: Table.isHeaderOrFooter });
        const [part] = l2 !== null && l2 !== void 0 ? l2 : [];
        if ((part === null || part === void 0 ? void 0 : part.columns) != null) {
            set.columns = part.columns;
        }
        else {
            for (const span of group.spans) {
                set.spans[span.name] = span;
            }
        }
        for (const [inx, column] of enumerate(set.columns)) {
            if (column.name != null) {
                set.columnNames[column.name] = inx;
            }
        }
        return set;
    },
};
