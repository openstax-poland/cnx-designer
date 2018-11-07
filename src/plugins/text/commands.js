// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * Remove all marks from current selection.
 *
 * @param {Slate~Change} change
 */
export function removeMarks(change) {
    for (const mark of change.value.marks) {
        change.removeMark(mark)
    }
}
