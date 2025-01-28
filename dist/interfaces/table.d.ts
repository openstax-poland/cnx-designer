import { Editor, Element, Path } from 'slate';
/**
 * A table
 *
 * Allowed children are, in order
 * - {@link Title} (optional)
 * - {@link TableGroup} (repeatable, at least one)
 * - {@link TableSummary} (optional)
 * - {@link Caption} (optional)
 */
export interface Table extends Element {
    type: 'table';
}
/** Summary of a {@link Table} */
export interface TableSummary extends Element {
    type: 'table_summary';
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
    type: 'table_group';
    /** Columns defined in this group */
    columns: TableColumn[];
    /** Column spans defined in this group */
    spans: TableSpan[];
}
/** Definition of a column in a {@link TableGroup} */
export type TableColumn = {
    /** Unique name assigned to this column */
    name: string | null;
};
/** Definition of a span of columns in a {@link TableGroup} */
export type TableSpan = {
    /** Unique name assigned to this span */
    name: string;
    /** Name of the first column in this span */
    start: string;
    /** Name of the last column in this span */
    end: string;
};
export type ColumnSet = {
    /** Column definitions by index */
    columns: TableColumn[];
    /** Mapping from column name to index */
    columnNames: {
        [name: string]: number;
    };
    /** Span definitions by name */
    spans: {
        [name: string]: TableSpan;
    };
};
/** {@link Rows TableRow} displayed above a table, once per page */
export interface TableHeader extends Element {
    type: 'table_header';
    /** Columns redefined for this header */
    columns?: TableColumn[];
}
/** {@link Rows TableRow} displayed below a table, once per page */
export interface TableFooter extends Element {
    type: 'table_footer';
    /** Columns redefined for this footer */
    columns?: TableColumn[];
}
/** Row of a table */
export interface TableRow extends Element {
    type: 'table_row';
}
/** Cell of a table */
export interface TableCell extends Element {
    type: 'table_cell';
    /** Column position specification */
    column?: ColumnPosition;
    /** Number of rows taken by this cell, if different than one */
    rows?: number;
}
/** Column position specification */
export type ColumnPosition = 
/** At named column */
{
    column: string;
}
/** Span between named columns */
 | {
    start: string;
    end: string;
}
/** At named span */
 | {
    span: string;
};
export declare const Table: {
    /** Check if value of unknown type is a table */
    isTable(this: void, value: unknown): value is Table;
    /** Check if value of unknown type is a table summary */
    isSummary(this: void, value: unknown): value is Table;
    /** Check if value of unknown type is a table group */
    isGroup(this: void, value: unknown): value is TableGroup;
    /** Check if value of unknown type is a table header */
    isHeader(this: void, value: unknown): value is TableHeader;
    /** Check if value of unknown type is a table footer */
    isFooter(this: void, value: unknown): value is TableFooter;
    /** Check if value of unknown type is a table header or footer */
    isHeaderOrFooter(this: void, value: unknown): value is TableHeader | TableFooter;
    /** Check if value of unknown type is a table row */
    isRow(this: void, value: unknown): value is TableRow;
    /** Check if value of unknown type is a table cell */
    isCell(this: void, value: unknown): value is TableCell;
    /**
     * Check if value of unknown type is a cell column position specification
     */
    isColumnPosition(this: void, value: unknown): value is ColumnPosition;
    /** Get set of columns in use at a location */
    columns(this: void, editor: Editor, at: Path): ColumnSet;
};
