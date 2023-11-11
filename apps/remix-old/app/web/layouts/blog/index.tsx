import {
  Box,
  createStyles,
  Group,
  ScrollArea,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Link, Outlet } from '@remix-run/react';

import { ToggleColorSchemeIcon } from '~/web/components/ToggleColorScheme';

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === 'dark';
  const backgroundColor = isDark ? theme.colors.dark[8] : theme.colors.gray[1];

  const color = isDark ? theme.colors.dark[0] : theme.colors.gray[7];

  const headerHeight = 60;
  return {
    blog: {
      backgroundColor,
      color,
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    headerPlaceholder: {
      height: headerHeight,
    },
    header: {
      zIndex: 1000,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: headerHeight,
      background: isDark ? 'rgba(10,10,0,0.6)' : 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(5px)',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
    },
  };
});

export default function AdminLayout() {
  const { classes } = useStyles();

  return (
    <ScrollArea
      className={classes.blog}
      styles={{
        scrollbar: { zIndex: 1001 },
      }}>
      <Box className={classes.header} px="10%">
        <Group position="apart" style={{ width: '100%' }}>
          <UnstyledButton component={Link} to="/blog">
            <Title order={2}>Yandif</Title>
          </UnstyledButton>
          <Box>
            <ToggleColorSchemeIcon />
          </Box>
        </Group>
      </Box>
      <Box className={classes.headerPlaceholder}></Box>
      <Outlet />
    </ScrollArea>
  );
}
