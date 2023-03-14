/* eslint-disable react/display-name */
import { Button, createStyles, Group, Paper } from '@mantine/core';
import React, { Fragment } from 'react';
import {
  AlignCenter,
  AlignJustified,
  AlignLeft,
  AlignRight,
  ArrowBackUp,
  Bold,
  Braces,
  Code,
  CornerDownLeft,
  Eraser,
  Italic,
  List,
  ListNumbers,
  Minus,
  Quote,
  SquareCheck,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'tabler-icons-react';
import Color from './components/Colorx';
import HeaderAndParagraph from './components/HeaderAndParagraph';
import Hightlight from './components/Highlight';
import Image from './components/Image';
import LinkMenu from './components/Link';
import useTool from './hooks/useTool';

const useStyles = createStyles(() => {
  return {
    main: {
      paddingTop: 80,
      paddingBottom: 80,
    },
    '.ProseMirror:focus': {
      outline: 'none',
    },
    item: {
      opacity: '0.3',
    },
    itemActive: {
      opacity: '1',
    },
  };
});

const MenuBar = ({ editor }: { editor: any }) => {
  const { classes, cx } = useStyles();
  const engine = useTool(editor);

  if (!editor || !engine) {
    return (
      <Paper
        radius={0}
        p={1}
        withBorder
        style={{ borderBottom: 'none', minHeight: 39 }}
      />
    );
  }

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const ScaleXArrowBackUp = () => (
    <ArrowBackUp size={16} style={{ transform: 'scaleX(-1)' }} />
  );

  const menus = [
    { label: '标题与正文', children: <HeaderAndParagraph editor={editor} /> },
    {
      label: '粗体',
      onClick: engine.bold.run,
      active: engine.bold.active(),
      Icon: Bold,
    },
    {
      label: '斜体',
      onClick: engine.italic.run,
      active: engine.italic.active(),
      Icon: Italic,
    },
    {
      label: '删除线',
      onClick: engine.strike.run,
      active: engine.strike.active(),
      Icon: Strikethrough,
    },
    {
      label: '行内代码',
      onClick: engine.code.run,
      active: engine.code.active(),
      Icon: Code,
    },
    {
      label: '代码块',
      onClick: engine.codeBlock.run,
      active: engine.codeBlock.active(),
      Icon: Braces,
    },
    {
      label: '无序列表',
      onClick: engine.bulletList.run,
      active: engine.bulletList.active(),
      Icon: List,
    },
    {
      label: '有序列表',
      onClick: engine.orderedList.run,
      active: engine.orderedList.active(),
      Icon: ListNumbers,
    },
    {
      label: '引用',
      onClick: engine.blockquote.run,
      active: engine.blockquote.active(),
      Icon: Quote,
    },
    {
      label: '左',
      onClick: engine.textAlign.left.run,
      active: engine.textAlign.left.active(),
      Icon: AlignLeft,
    },
    {
      label: '中',
      onClick: engine.textAlign.center.run,
      active: engine.textAlign.center.active(),
      Icon: AlignCenter,
    },
    {
      label: '右',
      onClick: engine.textAlign.right.run,
      active: engine.textAlign.right.active(),
      Icon: AlignRight,
    },
    {
      label: '对其',
      onClick: engine.textAlign.justify.run,
      active: engine.textAlign.justify.active(),
      Icon: AlignJustified,
    },
    {
      label: '上标',
      onClick: engine.superscript.run,
      active: engine.superscript.active(),
      Icon: Superscript,
    },

    {
      label: '下标',
      onClick: engine.subscript.run,
      active: engine.subscript.active(),
      Icon: Subscript,
    },
    {
      label: '下划线',
      onClick: engine.underline.run,
      active: engine.underline.active(),
      Icon: Underline,
    },
    {
      label: '任务项',
      onClick: engine.taskList.run,
      active: engine.taskList.active(),
      Icon: SquareCheck,
    },
    { label: '链接', children: <LinkMenu editor={editor} /> },
    { label: '图片', children: <Image editor={editor} /> },
    { label: '颜色', children: <Color editor={editor} /> },
    { label: '背景色', children: <Hightlight editor={editor} /> },
    {
      label: '分割线',
      onClick: engine.horizontalRule.run,
      active: true,
      Icon: Minus,
    },
    {
      label: '换行',
      onClick: engine.hardBreak.run,
      active: true,
      Icon: CornerDownLeft,
    },
    {
      label: '清楚样式',
      onClick: engine.clearMark.run,
      active: true,
      Icon: Eraser,
    },
    {
      label: '回退',
      onClick: engine.history.undo.run,
      active: true,
      Icon: ArrowBackUp,
    },
    {
      label: '重做',
      onClick: engine.history.redo.run,
      active: true,
      Icon: ScaleXArrowBackUp,
    },
  ];

  return (
    <Paper
      radius={0}
      p={1}
      withBorder
      style={{ borderBottom: 'none', minHeight: 36 }}>
      <Group position="center" spacing={0}>
        {menus.map(({ onClick, active, Icon, children, label }) => {
          if (children) {
            return <Fragment key={label}>{children}</Fragment>;
          }
          return (
            <Button
              key={label}
              variant="default"
              onClick={onClick}
              className={isActive(active)}
              px={9}
              style={{ border: 'none' }}>
              <Icon size={16} />
            </Button>
          );
        })}
      </Group>
    </Paper>
  );
};

export default MenuBar;
