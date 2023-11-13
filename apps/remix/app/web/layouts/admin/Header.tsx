import {
  Avatar,
  createStyles,
  Divider,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Link } from '@remix-run/react';
import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react';

import { ToggleColorSchemeIcon } from '~/web/components/ToggleColorScheme';
import useAdminStore from '~/web/stores/admin';

const useStyles = createStyles(
  (theme: {
    colorScheme: string;
    colors: { dark: any[]; gray: any[] };
    white: any;
    spacing: { md: any };
    shadows: { xs: any };
  }) => {
    const isDark = theme.colorScheme === 'dark';
    const backgroundColor = isDark ? theme.colors.dark[7] : theme.white;

    const color = isDark ? theme.colors.dark[0] : theme.colors.gray[7];

    return {
      header: {
        height: 60,
        padding: theme.spacing.md,
        backgroundColor,
        color,
        borderBottom: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        boxShadow: theme.shadows.xs,
      },
    };
  },
);

export default function Header() {
  const { classes } = useStyles();
  const { headerTitle, user } = useAdminStore();

  return (
    <Group position="apart" className={classes.header}>
      <Title order={5}>{headerTitle}</Title>
      <Menu
        size={170}
        placement="end"
        transition="pop-top-right"
        trigger="hover"
        delay={200}
        control={
          <UnstyledButton>
            <Group spacing={7}>
              <Avatar size={30} radius="xl" color="cyan"></Avatar>

              <Text weight={500} size="sm" mr={3}>
                {user?.username}
              </Text>
              <IconChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }>
        <Menu.Label>
          <ToggleColorSchemeIcon ml="md" />
        </Menu.Label>
        <Divider />
        <Menu.Label>设置</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>个人中心</Menu.Item>
        <Menu.Item component={Link} to="/logout" icon={<IconLogout size={14} />}>
          登出
        </Menu.Item>
      </Menu>
    </Group>
  );
}
