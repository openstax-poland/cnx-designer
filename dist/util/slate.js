// Copyright 2024 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Point, Range } from 'slate';
/** Compute intersection of two ranges */
export function intersectRanges(a, b) {
    let [astart, aend] = Range.edges(a);
    let [bstart, bend] = Range.edges(b);
    if (Point.isAfter(astart, bstart)) {
        astart = bstart;
        aend = bend;
        [bstart, bend] = Range.edges(a);
    }
    // |---| a
    //          |---| b
    if (Point.isAfter(bstart, bend)) {
        return null;
    }
    // |---| a
    //   |---| b
    if (Point.isAfter(bend, aend)) {
        return { anchor: bstart, focus: aend };
    }
    // |--------| a
    //   |---| b
    return { anchor: bstart, focus: bend };
}
