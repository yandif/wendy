import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import type { FC } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const NotFoundTitle: FC<{ to: string }> = ({ to = '/' }) => {
  const { classes } = useStyles();
  const nav = useNavigate();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>你访问的资源不存在</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}>
        这只是一个 404 页面，您可能输入了错误的地址，或者页面已移至另一个 URL。
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => nav(to)}>
          返回首页
        </Button>
      </Group>
    </Container>
  );
};
export default NotFoundTitle;
