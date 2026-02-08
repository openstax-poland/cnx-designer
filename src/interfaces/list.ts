// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Node } from 'slate'
import { BaseList, List as ExtList } from 'slate-lists'

export { ListItem } from 'slate-lists'

/** A styled list */
export type List = BulletedList | EnumeratedList

export const List = {
    isList(this: void, value: Node | undefined | null): value is BulletedList | EnumeratedList {
        return ExtList.isList(value)
    },
}

/** A bulleted list */
export interface BulletedList extends BaseList {
    style: 'bulleted'
    /** Bullet style */
    bullet: Bullet
}

export const BulletedList = {
    /** Check if value of unknown type is a bulleted list */
    isBulletedList(this: void, value: Node | undefined | null): value is BulletedList {
        return List.isList(value) && value.style === 'bulleted'
    },
}

export type Bullet = typeof _BULLETS[number]

const _BULLETS = [
    'bullet', 'open-circle', 'pilcrow', 'rpilcrow', 'asterisk', 'dash', 'section', 'none',
] as const

export const BULLETS: Bullet[] = _BULLETS as unknown as Bullet[]

/** An enumerated list */
export interface EnumeratedList extends BaseList {
    style: 'enumerated'
    /** Number style */
    numberStyle: NumberStyle
    /** Number of the first item */
    start: number
}

export type NumberStyle = typeof _NUMBER_STYLES[number]

const _NUMBER_STYLES = ['arabic', 'upper-alpha', 'lower-alpha', 'upper-roman', 'lower-roman'] as const

export const NUMBER_STYLES: NumberStyle[] = _NUMBER_STYLES as unknown as NumberStyle[]

export const EnumeratedList = {
    /** Check if value of unknown type is an enumerated list */
    isEnumeratedList(this: void, value: Node | undefined | null): value is BulletedList {
        return List.isList(value) && value.style === 'enumerated'
    },
}
