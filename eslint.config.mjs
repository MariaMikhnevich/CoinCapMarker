// @ts-check
import angular from 'angular-eslint';
import { configs as airbnbConfigs, plugins as airbnbPlugins } from 'eslint-config-airbnb-extended';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', '.angular/**', 'coverage/**', 'node_modules/**'],
    },
    airbnbPlugins.typescriptEslint,
    airbnbPlugins.importX,
    airbnbPlugins.stylistic,
    {
        files: ['**/*.ts'],
        extends: [
            ...airbnbConfigs.base.recommended,
            ...airbnbConfigs.base.typescript,
            ...angular.configs.tsRecommended,
        ],
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended],
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Angular style guide mandates named exports for components, modules, services, etc.
            'import-x/prefer-default-export': 'off',
            // Explicit types on component fields double as documentation for template bindings.
            '@typescript-eslint/no-inferrable-types': 'off',
            // Template-bound handlers and pure pipe transforms may legitimately not use `this`.
            'class-methods-use-this': 'off',
            // Angular event handlers routinely write to `event.target` properties (input sanitation).
            'no-param-reassign': ['error', { props: false }],
            // Boot/error logging is a legitimate use of the console.
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/consistent-type-exports': [
                'error',
                {
                    fixMixedExportsWithInlineTypeSpecifier: true,
                },
            ],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@stylistic/lines-between-class-members': 'off',
        },
    },
    eslintConfigPrettier,
);
