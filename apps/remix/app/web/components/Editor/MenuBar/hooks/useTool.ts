import { useMemo } from 'react';

export default function useTool(editor: any) {
  return useMemo(() => {
    if (!editor) return null;
    return {
      blockquote: {
        active: () => editor.isActive('blockquote'),
        run: () => editor.chain().focus().toggleBlockquote().run(),
      },
      bold: {
        active: () => editor.isActive('bold'),
        run: () => editor.chain().focus().toggleBold().run(),
      },
      bulletList: {
        active: () => editor.isActive('bulletList'),
        run: () => editor.chain().focus().toggleBulletList().run(),
      },
      code: {
        active: () => editor.isActive('code'),
        run: () => editor.chain().focus().toggleCode().run(),
      },
      codeBlock: {
        active: () => editor.isActive('codeBlock'),
        run: () => editor.chain().focus().toggleCodeBlock().run(),
      },
      hardBreak: {
        run: () => editor.chain().focus().setHardBreak().run(),
      },
      history: {
        redo: { run: () => editor.chain().focus().redo().run() },
        undo: { run: () => editor.chain().focus().undo().run() },
      },
      horizontalRule: {
        run: () => editor.chain().focus().setHorizontalRule().run(),
      },
      italic: {
        active: () => editor.isActive('italic'),
        run: () => editor.chain().focus().toggleItalic().run(),
      },
      orderedList: {
        active: () => editor.isActive('orderedList'),
        run: () => editor.chain().focus().toggleOrderedList().run(),
      },
      strike: {
        active: () => editor.isActive('strike'),
        run: () => editor.chain().focus().toggleStrike().run(),
      },
      heading: {
        h1: {
          active: () => editor.isActive('heading', { level: 1 }),
          run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        h2: {
          active: () => editor.isActive('heading', { level: 2 }),
          run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        h3: {
          active: () => editor.isActive('heading', { level: 3 }),
          run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        h4: {
          active: () => editor.isActive('heading', { level: 4 }),
          run: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        },
        h5: {
          active: () => editor.isActive('heading', { level: 5 }),
          run: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        },
        h6: {
          active: () => editor.isActive('heading', { level: 6 }),
          run: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        },
      },
      paragraph: {
        active: () => editor.isActive('paragraph'),
        run: () => editor.chain().focus().setParagraph().run(),
      },
      clearMark: {
        run: () =>
          editor
            .chain()
            .focus()
            .unsetAllMarks()
            .clearNodes()
            .unsetTextAlign()
            .unsetLink()
            .run(),
      },
      textAlign: {
        left: {
          active: () => editor.isActive({ textAlign: 'left' }),
          run: () => editor.chain().focus().setTextAlign('left').run(),
        },
        center: {
          active: () => editor.isActive({ textAlign: 'center' }),
          run: () => editor.chain().focus().setTextAlign('center').run(),
        },
        right: {
          active: () => editor.isActive({ textAlign: 'right' }),
          run: () => editor.chain().focus().setTextAlign('right').run(),
        },
        justify: {
          active: () => editor.isActive({ textAlign: 'justify' }),
          run: () => editor.chain().focus().setTextAlign('justify').run(),
        },
      },
      subscript: {
        active: () => editor.isActive('subscript'),
        run: () =>
          editor.chain().focus().unsetSuperscript().toggleSubscript().run(),
      },
      superscript: {
        active: () => editor.isActive('superscript'),
        run: () =>
          editor.chain().focus().unsetSubscript().toggleSuperscript().run(),
      },
      underline: {
        active: () => editor.isActive('underline'),
        run: () => editor.chain().focus().toggleUnderline().run(),
      },
      taskList: {
        active: () => editor.isActive('taskList'),
        run: () => editor.chain().focus().toggleTaskList().run(),
      },
      // 'listItem' // 列项
      // 'text', 文字
      // 'document', 文档
      // 'dropcursor', 拖放光标
      // 'gapcursor', 游标
    };
  }, [editor]);
}
