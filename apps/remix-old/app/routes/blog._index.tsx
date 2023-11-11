import { Container, Grid } from '@mantine/core';

import { ArticleCardVertical } from '~/web/components/ArticleCard';

export default function Home() {
  return (
    <Container styles={{ root: { maxWidth: '85%', padding: 16 } }}>
      <Grid>
        <Grid.Col span={3}>123</Grid.Col>
        <Grid.Col span={6}>
          <ArticleCardVertical
            image={'http://localhost:3000/img/upload_2661966541.jpg'}
            category={'前端'}
            title={'我的第一篇文章'}
            date={'2022-5-20'}
            author={{
              name: 'yandif',
              avatar: '',
            }}></ArticleCardVertical>
          <ArticleCardVertical
            image={'http://localhost:3000/img/upload_2885034973.png'}
            category={'前端'}
            title={'我的第一篇文章'}
            date={'2022-5-20'}
            author={{
              name: 'yandif',
              avatar: '',
            }}></ArticleCardVertical>
        </Grid.Col>
        <Grid.Col span={3}>123</Grid.Col>
      </Grid>
    </Container>
  );
}
