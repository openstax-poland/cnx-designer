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
        'babel-runtime/core-js/array/from',
        'babel-runtime/core-js/get-iterator',
        'babel-runtime/core-js/map',
        'babel-runtime/core-js/object/entries',
        'babel-runtime/core-js/object/freeze',
        'babel-runtime/core-js/object/get-prototype-of',
        'babel-runtime/core-js/object/keys',
        'babel-runtime/core-js/promise',
        'babel-runtime/core-js/symbol/for',
        'babel-runtime/core-js/symbol/iterator',
        'babel-runtime/helpers/asyncToGenerator',
        'babel-runtime/helpers/classCallCheck',
        'babel-runtime/helpers/createClass',
        'babel-runtime/helpers/extends',
        'babel-runtime/helpers/inherits',
        'babel-runtime/helpers/possibleConstructorReturn',
        'babel-runtime/helpers/slicedToArray',
        'babel-runtime/helpers/toConsumableArray',
        'babel-runtime/helpers/typeof',
        'babel-runtime/regenerator',
        'immutable',
        'prop-types',
        'react',
        'slate',
        'slate-edit-list',
        'slate-html-serializer',
        'slate-react',
    ]
}
