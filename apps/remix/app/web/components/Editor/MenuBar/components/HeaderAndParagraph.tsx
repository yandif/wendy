import type { TitleOrder } from '@mantine/core';
import { Button, createStyles, Menu, Text, Title } from '@mantine/core';
import { Check } from 'tabler-icons-react';

import useTool from '../hooks/useTool';
const useStyles = createStyles((theme) => {
  return {
    control: { border: 'none', fontWeight: 500 },
    controlText: {
      width: '40px',
    },
  };
});

const HeaderAndParagraph = ({ editor }: { editor: any }) => {
  const { classes } = useStyles();
  const engine = useTool(editor);

  if (!editor || !engine) {
    return null;
  }

  const isH1 = engine.heading.h1.active();
  const isH2 = engine.heading.h2.active();
  const isH3 = engine.heading.h3.active();
  const isH4 = engine.heading.h4.active();
  const isH5 = engine.heading.h5.active();
  const isH6 = engine.heading.h6.active();
  const isParagraph = engine.paragraph.active();

  const text = () => {
    if (isParagraph) return '正文';
    if (isH1) return '标题1';
    if (isH2) return '标题2';
    if (isH3) return '标题3';
    if (isH4) return '标题4';
    if (isH5) return '标题5';
    if (isH6) return '标题6';
    return '正文';
  };
  return (
    <Menu
      transition="fade"
      control={
        <Button variant="default" className={classes.control} px={9}>
          <Text className={classes.controlText}>{text()}</Text>
        </Button>
      }
      styles={{
        body: { width: '150px' },
        item: { paddingTop: '4px', paddingBottom: '4px' },
        itemLabel: { display: 'flex', alignItems: 'center' },
      }}>
      {[
        { title: '正文', onClick: engine.paragraph.run, active: isParagraph },
        {
          title: '标题1',
          onClick: engine.heading.h1.run,
          active: isH1,
          order: 1,
        },
        {
          title: '标题2',
          onClick: engine.heading.h2.run,
          active: isH2,
          order: 2,
        },
        {
          title: '标题3',
          onClick: engine.heading.h3.run,
          active: isH3,
          order: 3,
        },
        {
          title: '标题4',
          onClick: engine.heading.h4.run,
          active: isH4,
          order: 4,
        },
        {
          title: '标题5',
          onClick: engine.heading.h5.run,
          active: isH5,
          order: 5,
        },
        {
          title: '标题6',
          onClick: engine.heading.h6.run,
          active: isH6,
          order: 6,
        },
      ].map(({ title, onClick, active, order }) => {
        return (
          <Menu.Item key={title} onClick={onClick}>
            {order ? (
              <Title order={order as TitleOrder}>{title}</Title>
            ) : (
              <Text>{title}</Text>
            )}
            {active && <Check color="#bbb" />}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default HeaderAndParagraph;
