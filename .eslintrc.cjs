module.exports = {
    root: true,
    env: {
        browser: true,
        amd: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    overrides: [],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue', 'html', '@typescript-eslint', 'prettier'],
    rules: {
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'max-len': ['error', { code: 500 }],
    },
};
