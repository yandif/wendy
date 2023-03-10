import { Button, Group } from '@mantine/core';
import type { SpotlightAction } from '@mantine/spotlight';
import { openSpotlight, SpotlightProvider } from '@mantine/spotlight';
import { Dashboard, FileText, Home, Search } from 'tabler-icons-react';

const actions: SpotlightAction[] = [
  {
    title: '首页',
    description: '回到首页',
    onTrigger: () => console.log('Home'),
    icon: <Home size={18} />,
  },
  {
    title: '工作台',
    description: '获取全部介绍包括',
    onTrigger: () => console.log('Dashboard'),
    icon: <Dashboard size={18} />,
  },
  {
    title: '文档',
    description: '查看文档学习全部特性',
    onTrigger: () => console.log('Documentation'),
    icon: <FileText size={18} />,
  },
];

export default function Demo() {
  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<Search size={18} />}
      searchPlaceholder="搜索..."
      shortcut="mod + shift + k"
      nothingFoundMessage="暂无数据...">
      <Group position="center">
        <Button onClick={openSpotlight}>打开Spotlight</Button>
      </Group>
    </SpotlightProvider>
  );
}
