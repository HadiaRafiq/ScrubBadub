module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended', // Ensure Prettier rules are applied
  ],
  plugins: ['simple-import-sort', 'import', 'prettier'],
  rules: {
    // Prettier Integration
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],

    // Core Rules
    'react-hooks/exhaustive-deps': 'off',
    quotes: ['error', 'single'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/default-props-match-prop-types': 'error',
    'react/sort-prop-types': 'error',
    'prefer-template': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-duplicate-imports': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'no-constant-binary-expression': 'error',
    'no-await-in-loop': 'error',
    'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-spread': 'warn',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'warn',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'no-alert': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-else-return': 'error',
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'require-await': 'error',
    'simple-import-sort/exports': 'error',
    'react/no-unstable-nested-components': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],

    // Formatting Rules
    'no-trailing-spaces': 'error',
    'newline-before-return': 'error',
    'eol-last': ['error', 'always'],
    // indent: ['error', 2, { SwitchCase: 1 }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
