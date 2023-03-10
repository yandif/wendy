import {
  Box,
  Collapse,
  createStyles,
  Group,
  UnstyledButton,
} from '@mantine/core';
import { Link, useLocation } from '@remix-run/react';
import { useState } from 'react';
import type { Icon as TablerIcon } from 'tabler-icons-react';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    padding: '6px 12px',
    margin: '4px',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
    borderRadius: '6px',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  controlActive: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[7]
        : theme.colors.blue[5],
    color: theme.white,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.blue[7]
          : theme.colors.blue[5],
      color: theme.white,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: '6px 12px 6px 31px',
    margin: '0px 4px 8px 30px',

    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderRadius: '0 6px 6px 0 ',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  base: string;
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  base,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;
  const location = useLocation();

  // 高亮活跃的菜单
  const wrapperClass = (c: string, pathname?: string) => {
    const RealPathName = location.pathname.endsWith('/')
      ? location.pathname
      : location.pathname + '/';
    const activePathName = pathname?.endsWith('/')
      ? base + pathname
      : base + pathname + '/';
    const isActive =
      RealPathName === activePathName ? `${c} ${classes.controlActive}` : c;

    return isActive;
  };

  const initOpened = (hasLinks ? links : [])?.some(
    (_link) => location.pathname === base + _link.link,
  );

  const [opened, setOpened] = useState(initiallyOpened || initOpened || false);
  const items = (hasLinks ? links : []).map((_link) => (
    <UnstyledButton
      component={Link}
      className={wrapperClass(classes.link, _link.link)}
      to={base + _link.link}
      key={_link.label}>
      {_link.label}
    </UnstyledButton>
  ));

  return (
    <div>
      <UnstyledButton
        component={Link}
        to={link ? base + link : '#'}
        onClick={() => setOpened((o) => !o)}
        className={wrapperClass(classes.control, link)}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon size={18} />
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>

      {hasLinks ? (
        <Collapse
          in={opened}
          transitionDuration={200}
          transitionTimingFunction="linear">
          {items}
        </Collapse>
      ) : null}
    </div>
  );
}
