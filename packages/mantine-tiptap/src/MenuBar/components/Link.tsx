import { Button, createStyles, Popover } from '@mantine/core';
import React, { useState } from 'react';
import { Link as LinkIcon } from 'tabler-icons-react';

const useStyles = createStyles(() => {
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
      width={200}
      position="bottom-start"
      transitionProps={{ duration: 150, transition: 'fade' }}>
      <Popover.Target>
        <Button
          key="链接"
          variant="default"
          onClick={() => setOpened((o) => !o)}
          className={isActive(isImage)}
          px={9}>
          <LinkIcon size={16} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
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
      </Popover.Dropdown>
    </Popover>
  );
}

export default LinkMenu;
