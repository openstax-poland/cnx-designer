import { Node } from 'slate';
import { BaseList } from 'slate-lists';
export { ListItem } from 'slate-lists';
/** A styled list */
export type List = BulletedList | EnumeratedList;
export declare const List: {
    isList(this: void, value: Node | undefined | null): value is BulletedList | EnumeratedList;
};
/** A bulleted list */
export interface BulletedList extends BaseList {
    style: 'bulleted';
    /** Bullet style */
    bullet: Bullet;
}
export declare const BulletedList: {
    /** Check if value of unknown type is a bulleted list */
    isBulletedList(this: void, value: Node | undefined | null): value is BulletedList;
};
export type Bullet = typeof _BULLETS[number];
declare const _BULLETS: readonly ["bullet", "open-circle", "pilcrow", "rpilcrow", "asterisk", "dash", "section", "none"];
export declare const BULLETS: Bullet[];
/** An enumerated list */
export interface EnumeratedList extends BaseList {
    style: 'enumerated';
    /** Number style */
    numberStyle: NumberStyle;
    /** Number of the first item */
    start: number;
}
export type NumberStyle = typeof _NUMBER_STYLES[number];
declare const _NUMBER_STYLES: readonly ["arabic", "upper-alpha", "lower-alpha", "upper-roman", "lower-roman"];
export declare const NUMBER_STYLES: NumberStyle[];
export declare const EnumeratedList: {
    /** Check if value of unknown type is an enumerated list */
    isEnumeratedList(this: void, value: Node | undefined | null): value is BulletedList;
};
