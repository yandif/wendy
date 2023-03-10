import { Button, createStyles, Popover } from '@mantine/core';
import { useState } from 'react';
import { Link as LinkIcon } from 'tabler-icons-react';

const useStyles = createStyles((theme) => {
  return {
    item: {
      opacity: '0.3',
      border: 'none',
      position: 'relative',
    },
    itemActive: {
      opacity: '1',
    },
    lodash: {
      height: 2,
      width: 14,
      position: 'absolute',
      bottom: 7,
    },
  };
});

function LinkMenu({ editor }: { editor: any }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const isImage = editor.isActive('link');

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          key="链接"
          variant="default"
          onClick={() => setOpened((o) => !o)}
          className={isActive(isImage)}
          px={9}>
          <LinkIcon size={16} />
        </Button>
      }
      width={200}
      position="bottom"
      placement="start"
      transition="fade"
      styles={{
        wrapper: { marginTop: '-6px' },
      }}
      p={0}>
      <Button
        onClick={() => {
          // toggleLink
          editor
            .chain()
            .focus()
            .setLink({
              href: 'https://yandif.com',
            })
            .run();
        }}>
        设置链接
      </Button>
    </Popover>
  );
}

export default LinkMenu;
