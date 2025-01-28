// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { dedup } from '../util';
const WHITESPACE = /[ \t\n]+/;
export const WithClasses = {
    /** Check if value of unknown type has classes */
    hasClasses(value) {
        return typeof value === 'object'
            && Array.isArray(value.classes)
            && typeof value.classes[0] === 'string';
    },
    /** Verify that a string is a valid class. */
    isValidClass(value) {
        return value.match(WHITESPACE) == null;
    },
    /** Iterate over all valid classes in a string */
    *splitClasses(str) {
        yield* str.trim().split(WHITESPACE);
    },
    /** Normalize an array of classes, returning a new array */
    normalizeClasses(classes) {
        const result = [];
        for (const cls of classes) {
            result.push(...WithClasses.splitClasses(cls));
        }
        return dedup(result.sort((a, b) => a.localeCompare(b)));
    },
};
