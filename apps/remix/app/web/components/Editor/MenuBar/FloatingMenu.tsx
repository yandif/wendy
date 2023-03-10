import { Button, createStyles, Group, Paper } from '@mantine/core';
import { FloatingMenu as DefaultFloatingMenu } from '@tiptap/react';
import { List, ListNumbers } from 'tabler-icons-react';

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

const BubbleMenu = ({ editor }: { editor: any }) => {
  const { classes, cx } = useStyles();
  const engine = useTool(editor);

  if (!editor || !engine) {
    return null;
  }

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const menus = [
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
  ];

  return (
    <DefaultFloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Paper p={0}>
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
    </DefaultFloatingMenu>
  );
};

export default BubbleMenu;
