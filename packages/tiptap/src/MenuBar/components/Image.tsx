import { Button, createStyles, Popover } from '@mantine/core';
import React, { useState } from 'react';
import { Photo } from 'tabler-icons-react';

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

function Image({ editor }: { editor: any }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const isImage = editor.isActive('image');
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      width={200}
      position="bottom-start"
      transitionProps={{ duration: 150, transition: 'fade' }}>
      <Popover.Target>
        <Button
          key="图片"
          variant="default"
          onClick={() => setOpened((o) => !o)}
          className={isActive(isImage)}
          px={9}>
          <Photo size={16} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Button
          onClick={() => {
            editor
              .chain()
              .focus()
              .setImage({
                src: 'https://i.pinimg.com/564x/44/19/98/4419984054afae6663c031932737aecf.jpg',
              })
              .run();
          }}>
          设置图片
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}

export default Image;
