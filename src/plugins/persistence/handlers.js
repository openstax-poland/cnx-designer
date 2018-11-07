// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * Operations which not result in meaningful changes to the document.
 *
 * Operations which don't modify document content, such as moving cursor around,
 * can safely be ignored when restoring state.
 */
const IGNORED_OPERATIONS = [
    'set_selection',
]

/**
 * Properties of {@link Slate~Value} changes to which can safely be ignored.
 */
const IGNORED_VALUE_PROPS = [
    'data',
    'decorations',
    'schema',
    'selection',
]

/**
 * Persist all important operations.
 *
 * @param {DocumentDB} db
 * @param {Slate~Change} change
 */
export const onChange = db => function onChange(change, next) {
    next()

    const { value, operations } = change
    const document = value.document.key

    for (const op of operations) {
        if (IGNORED_OPERATIONS.includes(op.type)) continue

        if (op.type === 'set_value') {
            const keys = Object.keys(op.properties)
                .filter(key => !IGNORED_VALUE_PROPS.includes(key))

            if (keys.length === 0) continue
        }

        db.mark(op)
    }
}
