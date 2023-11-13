import {
  Center,
  createStyles,
  Navbar,
  ScrollArea,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Link } from '@remix-run/react';

import useAdminStore from '~/web/stores/admin';

import { LinksGroup } from './LinksGroup';

const useStyles = createStyles((theme) => {
  return {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
    },

    header: {
      height: 60,
      padding: theme.spacing.md,
    },

    menus: {
      padding: theme.spacing.xs,
    },
  };
});

export default function SideBar({ navbarWidth }: { navbarWidth: number }) {
  const { classes } = useStyles();
  const { sizeName, menus } = useAdminStore();

  return (
    <>
      <Navbar width={{ base: navbarWidth }} className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Center>
            <UnstyledButton component={Link} to="/admin/dashboard">
              <Title order={4}>{sizeName}</Title>
            </UnstyledButton>
          </Center>
        </Navbar.Section>

        <Navbar.Section grow className={classes.menus} component={ScrollArea}>
          {menus.map((item) => (
            <LinksGroup {...item} key={item.label} base="/admin" />
          ))}
        </Navbar.Section>
      </Navbar>
    </>
  );
}
