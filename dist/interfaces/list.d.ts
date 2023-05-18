import { List as BaseList } from 'slate-lists';
export { ListItem } from 'slate-lists';
/** A styled list */
export interface List extends BaseList {
    /** List style */
    style: 'bulleted' | 'enumerated';
}
export declare const List: {
    isList(value: unknown): value is List;
};
/** A bulleted list */
export interface BulletedList extends List {
    style: 'bulleted';
    /** Bullet style */
    bullet: Bullet;
}
export declare const BulletedList: {
    /** Check if value of unknown type is a bulleted list */
    isBulletedList(value: unknown): value is BulletedList;
};
export type Bullet = 'bullet' | 'open-circle' | 'pilcrow' | 'rpilcrow' | 'asterisk' | 'dash' | 'section' | 'none';
/** An enumerated list */
export interface EnumeratedList extends List {
    style: 'enumerated';
    /** Number style */
    numberStyle: NumberStyle;
    /** Number of the first item */
    start: number;
}
export type NumberStyle = 'arabic' | 'upper-alpha' | 'lower-alpha' | 'upper-roman' | 'lower-roman';
export declare const EnumeratedList: {
    /** Check if value of unknown type is an enumerated list */
    isEnumeratedList(value: unknown): value is BulletedList;
};
