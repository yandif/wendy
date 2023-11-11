import { Button, Group } from '@mantine/core';
import type { SpotlightAction } from '@mantine/spotlight';
import { openSpotlight, SpotlightProvider } from '@mantine/spotlight';
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch,
} from '@tabler/icons-react';

const actions: SpotlightAction[] = [
  {
    title: '首页',
    description: '回到首页',
    onTrigger: () => console.log('Home'),
    icon: <IconHome size={18} />,
  },
  {
    title: '工作台',
    description: '获取全部介绍包括',
    onTrigger: () => console.log('Dashboard'),
    icon: <IconDashboard size={18} />,
  },
  {
    title: '文档',
    description: '查看文档学习全部特性',
    onTrigger: () => console.log('Documentation'),
    icon: <IconFileText size={18} />,
  },
];

export default function Demo() {
  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="搜索..."
      shortcut="mod + shift + k"
      nothingFoundMessage="暂无数据...">
      <Group position="center">
        <Button onClick={openSpotlight}>打开Spotlight</Button>
      </Group>
    </SpotlightProvider>
  );
}
