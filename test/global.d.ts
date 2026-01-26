// Required for library code to typecheck when typechecking tests
import '../src/custom-types'

import { h as realH } from './util/h'

declare global {
    var h: typeof realH;
}

export {}
