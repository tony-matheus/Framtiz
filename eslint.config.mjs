// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends(
  'next/core-web-vitals',
  'next/typescript',
  'plugin:tailwindcss/recommended'
), {
  plugins: {
    // You must import the plugin — here is the ESM way
    tailwindcss: eslintPluginTailwindcss,
  },
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
