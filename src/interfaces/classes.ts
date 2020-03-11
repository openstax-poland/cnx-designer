// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { dedup } from '../util'

/** Elements which may optionally have classes */
export interface WithClasses {
    /** Sorted list of classes */
    classes: string[]
}

const WHITESPACE = /[ \t\n]/

export const WithClasses = {
    /** Check if value of unknown type has classes */
    hasClasses(value: any): value is WithClasses {
        return typeof value === 'object'
            && Array.isArray(value.classes)
            && typeof value.classes[0] === 'string'
    },

    /** Verify that a string is a valid class. */
    isValidClass(value: string): boolean {
        return value.match(WHITESPACE) == null
    },

    /** Iterate over all valid classes in a string */
    *splitClasses(str: string): Iterable<string> {
        yield* str.split(WHITESPACE)
    },

    /** Normalize an array of classes, returning a new array */
    normalizeClasses(classes: string[]): string[] {
        const result = []

        for (const cls of classes) {
            result.push(...WithClasses.splitClasses(cls))
        }

        return dedup(result.sort((a, b) => a.localeCompare(b)))
    },
}
