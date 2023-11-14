import { ColorSchemeProvider } from '@mantine/core';
import type { FC, ReactNode } from 'react';

import useThemeStore from '~/web/stores/theme';

const MantineProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useThemeStore();

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {children}
    </ColorSchemeProvider>
  );
};

export default MantineProvider;
