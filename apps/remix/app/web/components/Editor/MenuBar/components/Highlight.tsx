import {
  Button,
  ColorPicker,
  createStyles,
  DEFAULT_THEME,
  Popover,
} from '@mantine/core';
import { useState } from 'react';
import { Highlight as HighlightIcon } from 'tabler-icons-react';

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

function Highlight({ editor }: { editor: any }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState<string>();

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const pickColor = (colorArr: string[]) => {
    return colorArr.slice(3, 10);
  };
  const isHighlight = editor.isActive('highlight');
  let backgroundColor;

  if (isHighlight) {
    const { color: _color } = editor.getAttributes('highlight');
    if (_color) {
      backgroundColor = _color;
    } else {
      backgroundColor = '#faf594';
    }
  }

  const handleChange = (value: string) => {
    setColor(value);
    editor.chain().focus().toggleHighlight({ color: value }).run();
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          key="背景色"
          variant="default"
          onClick={() => setOpened((o) => !o)}
          className={isActive(isHighlight)}
          px={5}>
          <div
            style={{
              backgroundColor,
              padding: '3px 3px 2px 3px',
              borderRadius: '4px',
            }}>
            <HighlightIcon size={16} />
          </div>
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
      <ColorPicker
        format="hex"
        value={color}
        onChange={handleChange}
        withPicker={false}
        fullWidth
        swatchesPerRow={7}
        swatches={[
          ...pickColor(DEFAULT_THEME.colors.red),
          ...pickColor(DEFAULT_THEME.colors.yellow),
          ...pickColor(DEFAULT_THEME.colors.green),
          ...pickColor(DEFAULT_THEME.colors.blue),
        ]}
      />
    </Popover>
  );
}

export default Highlight;
