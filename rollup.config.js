import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true,
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        resolve(),
    ],
    external: [
        '@babel/runtime/helpers/assertThisInitialized',
        '@babel/runtime/helpers/asyncToGenerator',
        '@babel/runtime/helpers/classCallCheck',
        '@babel/runtime/helpers/createClass',
        '@babel/runtime/helpers/defineProperty',
        '@babel/runtime/helpers/extends',
        '@babel/runtime/helpers/getPrototypeOf',
        '@babel/runtime/helpers/inherits',
        '@babel/runtime/helpers/objectSpread2',
        '@babel/runtime/helpers/possibleConstructorReturn',
        '@babel/runtime/helpers/slicedToArray',
        '@babel/runtime/helpers/toConsumableArray',
        '@babel/runtime/helpers/typeof',
        '@babel/runtime/helpers/wrapNativeSuper',
        '@babel/runtime/regenerator',
        'immutable',
        'prop-types',
        'react',
        'slate',
        'slate-counters',
        'slate-edit-list',
        'slate-html-serializer',
        'slate-react',
    ],
}
