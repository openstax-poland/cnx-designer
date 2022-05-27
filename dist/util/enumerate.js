// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
/** Yield items of an iterable together with their indices */
export default function* enumerate(iter, reverse) {
    if (reverse) {
        if (Array.isArray(iter)) {
            for (let index = iter.length - 1; index >= 0; --index) {
                yield [index, iter[index]];
            }
        }
        else {
            yield* enumerate(Array.from(iter), true);
        }
        return;
    }
    let index = 0;
    for (const value of iter) {
        yield [index++, value];
    }
}
