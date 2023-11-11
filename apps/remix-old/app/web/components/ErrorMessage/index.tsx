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

const ErrorMessage: FC<{
  label?: string;
  title?: string;
  description?: string;
}> = ({ label, title, description }) => {
  const { classes } = useStyles();
  const nav = useNavigate();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>{label}</div>
      <Title className={classes.title}>{title}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}>
        {description}
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => nav(-1)}>
          返回
        </Button>
      </Group>
    </Container>
  );
};
export default ErrorMessage;
