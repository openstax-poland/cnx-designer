// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { List as BaseList } from 'slate-lists';
export { ListItem } from 'slate-lists';
export const List = {
    isList(value) {
        return BaseList.isList(value);
    },
};
export const BulletedList = {
    /** Check if value of unknown type is a bulleted list */
    isBulletedList(value) {
        return List.isList(value) && value.style === 'bulleted';
    },
};
export const EnumeratedList = {
    /** Check if value of unknown type is an enumerated list */
    isEnumeratedList(value) {
        return List.isList(value) && value.style === 'enumerated';
    },
};
