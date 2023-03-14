import type { CSSObject, MantineTheme, PaperProps, Sx } from '@mantine/core';
import { createStyles, Paper } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Capture } from 'tabler-icons-react';
import { CodeBlockRefractor } from './Plugin/CodeBlockRefractor';
import { Image } from './Plugin/image';
import { darkTheme, lightTheme } from './theme';

const editorStyle: Sx = (theme: MantineTheme) => {
  const isDark = theme.colorScheme === 'dark';
  const mainColor = theme.colors.blue[6];

  const renderHeader = (level: number): CSSObject => {
    const topArr = [15, 11, 5, 3, 2, 0];
    return {
      position: 'relative',
      color: mainColor,
      '&:before': {
        content: `"H${level}"`,
        position: 'absolute',
        color: '#c6c9ce',
        left: -22,
        fontSize: 12,
        top: topArr[level - 1],
        transform: 'scale(1)',
      },
    };
  };

  const renderQuote = (): CSSObject => {
    return {
      borderLeft: `3px solid ${mainColor}`,
      marginInline: 0,
      paddingLeft: 8,
      color: '#8c8c8c',
      p: {
        marginBlock: 8,
      },
    };
  };

  const renderList = (): CSSObject => {
    return {
      paddingInlineStart: 26,
      'li::marker': {
        color: mainColor,
      },
    };
  };

  const renderTask = (): CSSObject => {
    return {
      listStyle: 'none',
      padding: '0',
      '& > li': {
        alignItems: 'center',
        display: 'flex',
        '& > label': {
          flex: '0 0 auto',
          marginRight: '0.5rem',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          userSelect: 'none',
          marginTop: '9px',
          alignSelf: 'flex-start',
          '& > input': {
            cursor: 'pointer',
          },
        },
        '& > div': {
          flex: '1 1 auto',
          '& > p': {
            marginBlockStart: '0.5em',
            marginBlockEnd: '0.5em',
          },
        },
      },
    };
  };

  const fontFamily = 'Consolas,微软雅黑,霞鹭文楷';

  return {
    margin: 'auto',
    fontFamily,
    background: isDark ? theme.colors.dark[5] : theme.white,
    '& *': {
      wordBreak: 'break-all',
      '&::selection': {
        background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
      },
    },
    '.ProseMirror': {
      padding: '0 32px',
      '&:focus': {
        outline: 'none',
      },
      '&>h1': renderHeader(1),
      '&>h2': renderHeader(2),
      '&>h3': renderHeader(3),
      '&>h4': renderHeader(4),
      '&>h5': renderHeader(5),
      '&>h6': renderHeader(6),
      blockquote: renderQuote(),
      ol: renderList(),
      ul: renderList(),
      'ul[data-type="taskList"]': renderTask(),
      hr: {
        border: 'none !important',
        borderBottom: `2px solid ${mainColor} !important`,

        '&.ProseMirror-selectednode': {
          borderColor: '#bbb !important',
        },
      },
      pre: {
        margin: '16px 0',
        code: {
          fontFamily,
        },
      },
      img: {
        maxWidth: '100%',
      },
      svg: {
        margin: '0 auto',
        display: 'block',
      },
      mark: {
        backgroundColor: 'inherit',
        color: mainColor,
      },
      a: {
        textDecoration: 'none',
      },
      '.ProseMirror-selectednode': {
        border: '1px solid #bbb',
        '.show': {
          borderBottom: '1px solid #bbb',
          background: '#eee',
        },
      },
      '.has-focus': {
        border: `1px solid ${mainColor}`,
      },
      'p.is-empty.is-editor-empty': {
        marginLeft: -5,
        position: 'relative',
        '&::before': {
          color: isDark ? '#5c5f66' : '#adb5bd',
          content: 'attr(data-placeholder)',
          position: 'absolute',
          lineHeight: '14px',
          pointerEvents: 'none',
          fontSize: 14,
          top: 7,
          left: 4,
        },
      },
    },
    ...(isDark ? darkTheme() : lightTheme()),
  };
};

const useStyles = createStyles(() => ({}));

function Editor(
  props: PaperProps & {
    name?: string;
    value?: string;
    error?: ReactNode | string;
    placeholder?: string;
    autofocus?: boolean;
    onChange: (val: string) => any;
  },
) {
  const handleChange = _.debounce((v) => {
    props.onChange(v);
  }, 300);

  const { theme } = useStyles();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Link.configure({
        autolink: false,
        openOnClick: false,
      }),
      Subscript,
      Superscript,
      underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockRefractor,
    ],
    content: props.value,
    autofocus: !!props.autofocus,
    editable: true,
    injectCSS: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleChange(html);
    },
  });

  const borderColor = (() => {
    if (editor?.isFocused) {
      return 'rgb(82, 166, 236)';
    }
    if (props.error) {
      return 'red';
    }
    if (theme.colorScheme === 'dark') {
      return '#1A1B1E';
    }
    return 'rgb(206, 212, 218)';
  })();
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <div style={{ position: 'relative' }}>
      <Capture
        style={{
          position: 'absolute',
          zIndex: 1,
          right: 16,
          top: 16,
          cursor: 'pointer',
        }}
        onClick={toggle}
        size={16}
        strokeWidth={2}
      />
      <Paper
        ref={ref}
        radius={0}
        m={0}
        p={0}
        px={fullscreen ? '20%' : 0}
        withBorder
        sx={editorStyle}
        style={{
          height: '510px',
          overflow: 'auto',
          borderColor,
        }}
        onClick={() => {
          if (!editor?.isFocused) {
            editor?.commands.focus();
          }
        }}>
        <EditorContent editor={editor} />
      </Paper>
    </div>
  );
}
function EditorServer(
  _props: PaperProps & {
    name?: string;
    value?: string;
    error?: ReactNode | string;
    placeholder?: string;
    autofocus?: boolean;
    onChange: (val: string) => any;
  },
) {
  return null;
}
const isClient = typeof document !== 'undefined';
export default isClient ? Editor : EditorServer;
