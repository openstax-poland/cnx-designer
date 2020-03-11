// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/** Given a sorted array return its copy with duplicates removed */
export default function dedup<T>(array: T[]): T[] {
    return array.filter((value, inx, arr) => inx === 0 || value !== arr[inx - 1])
}
