import { type Editor } from 'slate'
import { describe, test } from 'vitest'
import fs from 'fs'
import { basename, extname, resolve } from 'path'

import { CnxEditor } from '../../src'

type TestModule<D> = {
    default: D,
    skip?: boolean | string,
    input: Editor,
    output: Editor,
    checkSelection: boolean,
    withEditor?: (editor: CnxEditor) => CnxEditor,
}

type TestFunction<D> = (module: TestModule<D>) => void

export default function fixtures<D = void>(path: string, test: TestFunction<D>): void
export default function fixtures<D = void>(
    path0: string,
    path1: string,
    test: TestFunction<D>,
): void

export default function fixtures<D = void>(...args: [...string[], TestFunction<D>]): void {
    const fn = args.pop() as TestFunction<D>

    const path = resolve(...args as string[])
    const files = fs.readdirSync(path)
    const name = basename(path)

    describe(name, () => {
        for (const file of files) {
            const p = resolve(path, file)
            const stat = fs.statSync(p)

            if (stat.isDirectory()) {
                fixtures(path, file, fn)
                continue
            }

            const name = basename(file, extname(file))

            // This needs to be a non-arrow function to use `this.skip()`.
            test(name, async ({ skip }) => {
                const module = await import(p) as TestModule<D>

                if (module.skip) {
                    skip(module.skip as string)
                    return
                }

                fn(module)
            })
        }
    })
}
