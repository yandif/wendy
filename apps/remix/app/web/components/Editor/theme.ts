import type { Sx } from '@mantine/core';

/* eslint-disable quotes */
export function lightTheme(): Sx {
  return {
    "code[class*='language-'], pre[class*='language-']": {
      color: '#000',
      background: '0 0',
      textShadow: '0 1px #fff',
      fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
      fontSize: '1em',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: 1.5,
      MozTabSize: '4',
      OTabSize: '4',
      tabSize: 4,
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        background: 'transparent',
        width: 6,
        height: 6,
      },
      '&::-webkit-scrollbar-thumb ': {
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 3,
      },
    },
    "code[class*='language-'] ::-moz-selection, code[class*='language-']::-moz-selection, pre[class*='language-'] ::-moz-selection, pre[class*='language-']::-moz-selection":
      {
        textShadow: 'none',
        background: '#b3d4fc',
      },
    "code[class*='language-'] ::selection, code[class*='language-']::selection, pre[class*='language-'] ::selection, pre[class*='language-']::selection":
      {
        textShadow: 'none',
        background: '#b3d4fc',
      },
    '@media print': {
      "code[class*='language-'],   pre[class*='language-']": {
        textShadow: 'none',
      },
    },
    "pre[class*='language-']": {
      padding: '1em',
      overflow: 'auto',
    },
    ":not(pre) > code[class*='language-'], pre[class*='language-']": {
      background: '#eee',
    },
    ":not(pre) > code[class*='language-']": {
      padding: '0.1em',
      borderRadius: '0.3em',
      whiteSpace: 'normal',
    },
    '.token.cdata, .token.comment, .token.doctype, .token.prolog': {
      color: '#708090',
    },
    '.token.punctuation': { color: '#999' },
    '.token.namespace': { opacity: 0.7 },
    '.token.boolean, .token.constant, .token.deleted, .token.number, .token.property, .token.symbol, .token.tag':
      {
        color: '#905',
      },
    '.token.attr-name, .token.builtin, .token.char, .token.inserted, .token.selector, .token.string':
      {
        color: '#690',
      },
    '.language-css .token.string, .style .token.string, .token.entity, .token.operator, .token.url':
      {
        color: '#9a6e3a',
        background: 'hsla(0, 0%, 100%, 0.5)',
      },
    '.token.atrule, .token.attr-value, .token.keyword': { color: '#07a' },
    '.token.class-name, .token.function': { color: '#dd4a68' },
    '.token.important, .token.regex, .token.variable': { color: '#e90' },
    '.token.bold, .token.important': { fontWeight: 700 },
    '.token.italic': { fontStyle: 'italic' },
    '.token.entity': { cursor: 'help' },
  };
}

export function darkTheme(): Sx {
  return {
    'code[class*=language-],pre[class*=language-]': {
      color: '#f8f8f2',
      background: '0 0',
      textShadow: '0 1px rgba(0,0,0,.3)',
      fontFamily: "Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace",
      fontSize: '1em',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: 1.5,
      MozTabSize: '4',
      OTabSize: '4',
      tabSize: 4,
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        background: 'transparent',
        width: 6,
        height: 6,
      },
      '&::-webkit-scrollbar-thumb ': {
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 3,
      },
    },
    'pre[class*=language-]': {
      padding: '1em',
      overflow: 'auto',
      borderRadius: '.3em',
    },
    ':not(pre)>code[class*=language-],pre[class*=language-]': {
      background: '#1a1b1e',
      border: '1px solid #2c2e33',
    },
    ':not(pre)>code[class*=language-]': {
      padding: '.1em',
      borderRadius: '.3em',
      whiteSpace: 'normal',
    },
    '.token.cdata,.token.comment,.token.doctype,.token.prolog': {
      color: '#8292a2',
    },
    '.token.punctuation': { color: '#f8f8f2' },
    '.token.namespace': { opacity: 0.7 },
    '.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag': {
      color: '#f92672',
    },
    '.token.boolean,.token.number': { color: '#ae81ff' },
    '.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string':
      {
        color: '#a6e22e',
      },
    '.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable':
      {
        color: '#f8f8f2',
      },
    '.token.atrule,.token.attr-value,.token.class-name,.token.function': {
      color: '#e6db74',
    },
    '.token.keyword': { color: '#66d9ef' },
    '.token.important,.token.regex': { color: '#fd971f' },
    '.token.bold,.token.important': { fontWeight: 700 },
    '.token.italic': { fontStyle: 'italic' },
    '.token.entity': { cursor: 'help' },
  };
}
