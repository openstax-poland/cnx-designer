Plugin tests are defined as ES6 modules under `plugins/name`
exporting certain symbols:

```typescript
/** The change function. */
export default (editor: Editor) => void

/**  If true don't execute this test. */
export const skip: boolean = false

/** Check resulting selection against output. */
export const checkSelection: boolean = true

/**
 * Value to which to initialize the editor before executing the change
 * function.
 */
export const input: Node[]

/**
 * Reference value to which to compare result of executing the change
 * function.
 */
export const output?: Node[]
```

Only the change function and `input` are required,
other symbols are optional
and have default values as shown in the snippet.
