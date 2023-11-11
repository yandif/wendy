import type { ActionIconProps } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

import useThemeStore from '~/web/stores/theme';

export function ToggleColorSchemeIcon(props: Omit<ActionIconProps, 'title'>) {
  const { colorScheme, toggleColorScheme } = useThemeStore();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={toggleColorScheme}
      title="Toggle color scheme"
      {...props}>
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
}
