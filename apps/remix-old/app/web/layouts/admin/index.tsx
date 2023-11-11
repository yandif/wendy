import { Box, createStyles, ScrollArea } from '@mantine/core';
import { Outlet } from '@remix-run/react';

import useAdminStore from '~/web/stores/admin';

import Header from './Header';
import SideBar from './SideBar';

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === 'dark';
  const backgroundColor = isDark ? theme.colors.dark[7] : theme.white;

  const color = isDark ? theme.colors.dark[0] : theme.colors.gray[7];

  return {
    admin: {
      backgroundColor,
      color,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    },

    mainWrapper: {
      width: '100%',
      height: 'calc(100vh - 60px)',
    },

    main: {
      boxSizing: 'border-box',
      minHeight: 'calc(100vh - 60px)',
      padding: theme.spacing.md,
      backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
    },
  };
});

export default function AdminLayout() {
  const { classes } = useStyles();
  const { user } = useAdminStore();
  const navbarWidth = 180;

  return (
    <Box className={classes.admin}>
      {user && (
        <>
          <SideBar navbarWidth={navbarWidth} />
          <Box pl={navbarWidth}>
            <Header />
            <ScrollArea className={classes.mainWrapper}>
              <Box className={classes.main}>
                <Outlet />
              </Box>
            </ScrollArea>
          </Box>
        </>
      )}
    </Box>
  );
}
