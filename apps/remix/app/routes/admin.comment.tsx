import { Grid, Skeleton } from '@mantine/core';

import { useTitle } from '~/web/hooks/useTitle';

const child = <Skeleton height={140} radius="md" animate={false} />;

export function GridAsymmetrical() {
  return (
    <Grid>
      <Grid.Col xs={4}>{child}</Grid.Col>
      <Grid.Col xs={8}>{child}</Grid.Col>
    </Grid>
  );
}

export default function Comment() {
  useTitle('公告管理');

  return <GridAsymmetrical />;
}
