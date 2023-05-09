module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json',
        useJSXTextNode: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb-typescript/base',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    // add your custom rules here
    rules: {
        '@typescript-eslint/indent': [
            'error',
            2
        ],
        'spaced-comment': [
            'error',
            'always',
            { markers: ['/ <reference'] }
        ],
        'import/no-extraneous-dependencies': ['off', {
            devDependencies: true,
            optionalDependencies: false,
        }],
        'max-len': ['error', { 'code': 200 }],
        '@next/next/no-img-element': ['off'],
        'prefer-promise-reject-errors': ['off'],
        'react/jsx-filename-extension': ['off'],
        'react/prop-types': ['off'],
        'import/extensions': ['off'],
        'jsx-a11y/anchor-is-valid': ['off'],
        'no-return-assign': ['off']
    }
}