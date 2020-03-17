// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/** Yield items of an iterable together with their indices */
export default function *enumerate<T>(iter: Iterable<T>): Iterable<[number, T]> {
    let index = 0

    for (const value of iter) {
        yield [index++, value]
    }
}
