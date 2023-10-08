import { Box, createStyles } from '@mantine/core';

import { useTitle } from '~/web/hooks/useTitle';

const useStyles = createStyles((theme) => {
  return {
    main: {},
  };
});

export default function Catrgory() {
  const { classes } = useStyles();
  useTitle('公告管理');

  return <Box className={classes.main}>分类管理</Box>;
}
