import { defineConfig } from "eslint/config"
import base from '@openstax-poland/eslint-config/base'

export default defineConfig([base, {
    ignores: ['test/**/*'],

    rules: {
        // Same as default configuration but PascalCase is allowed for variable
        // names. This is because we follow Slate's convention of defining
        // functions connected to interfaces as an object with the same name
        // (using declaration merging):
        //
        // interface Name {}
        //
        // const Name = {
        //     isName(value: unknown): value is Name {
        //         // ...
        //     },
        // }
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
    },
}, {
    files: ['test/**/*.tsx'],

    rules: {
        // Neither slate nor slate-hyperscript does whitespace collapse, so
        // "nice" formatting for test fragments could change their meaning.
        '@stylistic/jsx-one-expression-per-line': 'off',

        'import-x/no-anonymous-default-export': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@stylistic/newline-per-chained-call': 'off',
    }
}])
