// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { List as BaseList } from 'slate-lists'

export { ListItem } from 'slate-lists'

/** A styled list */
export interface List extends BaseList {
    /** List style */
    style: 'bulleted' | 'enumerated'
}

export const List = {
    isList(value: unknown): value is List {
        return BaseList.isList(value)
    },
}

/** A bulleted list */
export interface BulletedList extends List {
    style: 'bulleted'
    /** Bullet style */
    bullet: Bullet
}

export const BulletedList = {
    /** Check if value of unknown type is a bulleted list */
    isBulletedList(value: unknown): value is BulletedList {
        return List.isList(value) && value.style === 'bulleted'
    },
}

export type Bullet = 'bullet'
    | 'open-circle'
    | 'pilcrow'
    | 'rpilcrow'
    | 'asterisk'
    | 'dash'
    | 'section'
    | 'none'

/** An enumerated list */
export interface EnumeratedList extends List {
    style: 'enumerated'
    /** Number style */
    numberStyle: NumberStyle
    /** Number of the first item */
    start: number
}

export type NumberStyle =
    'arabic' | 'upper-alpha' | 'lower-alpha' | 'upper-roman' | 'lower-roman'

export const EnumeratedList = {
    /** Check if value of unknown type is an enumerated list */
    isEnumeratedList(value: unknown): value is BulletedList {
        return List.isList(value) && value.style === 'enumerated'
    },
}
