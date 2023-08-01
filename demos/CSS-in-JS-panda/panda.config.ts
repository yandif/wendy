import { defineConfig } from '@pandacss/dev';
import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  name: 'button',
  description: 'The styles for the Button component',
  base: {
    display: 'flex',
  },
  variants: {
    visual: {
      funky: { bg: 'red.200', color: 'white' },
      edgy: { border: '1px solid {colors.red.500}' },
    },
    size: {
      sm: { padding: '4', fontSize: '12px' },
      lg: { padding: '8', fontSize: '40px' },
    },
    shape: {
      square: { borderRadius: '0' },
      circle: { borderRadius: 'full' },
    },
  },
  defaultVariants: {
    visual: 'funky',
    size: 'sm',
    shape: 'circle',
  },
  jsx: ['Button', 'PageButton'],
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        red: { value: '#EE0F0F' },
        green: { value: '#0FEE0F' },
      },
    },
    semanticTokens: {
      colors: {
        colors: {
          danger: {
            value: { base: '{colors.red}', _dark: '{colors.darkred}' },
          },
          success: {
            value: { base: '{colors.green}', _dark: '{colors.darkgreen}' },
          },
        },
      },
    },
    extend: {
      recipes: {
        button: buttonRecipe,
      },
    },
  },
  // emitPackage: true,

  // The output directory for your css system
  outdir: 'styled-system',

  // 散列样式名(有问题回头再看)
  // hash: true,

  jsxFramework: 'react',
  jsxFactory: 'panda',
});
