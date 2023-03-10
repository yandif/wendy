import {
  Button,
  ColorPicker,
  createStyles,
  DEFAULT_THEME,
  Popover,
} from '@mantine/core';
import { useState } from 'react';
import { ColorPicker as ColorPickerIcon } from 'tabler-icons-react';

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

function Color({ editor }: { editor: any }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState<string>();

  const isActive = (active: boolean) => {
    return cx(classes.item, {
      [classes.itemActive]: active,
    });
  };

  const pickColor = (colorArr: string[]) => {
    return colorArr.slice(0, 7);
  };
  const isColor = editor.isActive('textStyle');
  let backgroundColor;

  if (isColor) {
    const { color: _color } = editor.getAttributes('textStyle');
    backgroundColor = _color;
  }

  const handleChange = (value: string) => {
    setColor(value);
    editor.chain().focus().setColor(value).run();
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          key="颜色"
          variant="default"
          onClick={() => setOpened((o) => !o)}
          className={isActive(isColor)}
          px={9}
          style={{
            color: backgroundColor,
          }}>
          <ColorPickerIcon size={16} />
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
          ...pickColor(DEFAULT_THEME.colors.dark),
          ...pickColor(DEFAULT_THEME.colors.gray),
          ...pickColor(DEFAULT_THEME.colors.orange),
          ...pickColor(DEFAULT_THEME.colors.lime),
        ]}
      />
    </Popover>
  );
}

export default Color;
