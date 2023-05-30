module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    extends: ['plugin:vue/essential', 'plugin:promise/recommended', 'prettier'],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: "module",
    },
    plugins: ['vue', 'promise'],
    rules: {
        'linebreak-style': 0,
        indent: ['error', 4],
        allowIndentationTabs: true,
        'max-len': ['error', { code: 200 }],
        'promise/always-return': 'off',
        'promise/no-return-wrap': 'off',
        'promise/catch-or-return': 'off',
        'promise/no-nesting': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
};
