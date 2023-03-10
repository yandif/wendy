import { Button, createStyles, Group, Paper } from '@mantine/core';
import { BubbleMenu as DefaultBubbleMenu } from '@tiptap/react';
import { Bold, Italic, Strikethrough } from 'tabler-icons-react';

import useTool from './hooks/useTool';

const useStyles = createStyles((theme) => {
  return {
    item: {
      opacity: '0.3',
    },
    itemActive: {
      opacity: '1',
    },
  };
});

const BubbleMenu = ({
  editor,
  parent,
  setTippy,
  onTippyUpdate,
}: {
  editor: any;
  parent: any;
  setTippy: any;
  onTippyUpdate: any;
}) => {
  const { classes, cx } = useStyles();
  const engine = useTool(editor);

  if (!editor || !engine || !parent) {
    return null;
  }

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const menus = [
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
  ];
  const hidden = editor.isActive('image') || editor.isActive('codeBlock');
  return (
    <DefaultBubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'bottom',
        appendTo: parent,
        onCreate: (tippy) => {
          setTippy(tippy);
        },
        onBeforeUpdate: onTippyUpdate,
      }}>
      {!hidden && (
        <Paper p={0} withBorder shadow="sm">
          <Group position="center" spacing={0}>
            {menus.map(({ onClick, active, Icon, label }) => {
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
      )}
    </DefaultBubbleMenu>
  );
};

export default BubbleMenu;
