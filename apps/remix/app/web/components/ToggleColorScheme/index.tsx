import type { ActionIconProps } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';

import useThemeStore from '~/web/stores/theme';

export function ToggleColorSchemeIcon(
  props: Omit<ActionIconProps<'button'>, 'title'>,
) {
  const { colorScheme, toggleColorScheme } = useThemeStore();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={toggleColorScheme}
      title="Toggle color scheme"
      {...props}>
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
}
