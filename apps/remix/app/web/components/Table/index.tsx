import {
  Box,
  Center,
  Group,
  Pagination,
  Select,
  Table as DefaultTable,
  Text,
} from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Box as BoxIcon } from 'tabler-icons-react';

function useSize(_size: number) {
  const [size, setSize] = useState(_size);

  const sizeArr = [
    { value: '5', label: '5条/页' },
    { value: '10', label: '10条/页' },
    { value: '15', label: '15条/页' },
    { value: '20', label: '20条/页' },
  ];

  if (![5, 10, 15, 20].includes(size)) {
    sizeArr.unshift({ value: `${size}`, label: `${size}条/页` });
  }

  return { size, sizeArr, setSize };
}

export default function Table({
  data = [],
  columns = [],
  pagination = {
    total: 0,
    size: 5,
    page: 1,
  },
  bodyHeight = 'calc(100vh - 300px)',
}: {
  data: any[];
  columns: any[];
  pagination: { total: number; size: number; page: number };
  bodyHeight?: string;
}) {
  const nav = useNavigate();
  const { size, sizeArr, setSize } = useSize(pagination.size);
  const isEmpty = data?.length === 0;
  return (
    <Box style={{ position: 'relative' }}>
      <DefaultTable
        highlightOnHover
        horizontalSpacing="xl"
        verticalSpacing="sm"
        sx={() => {
          return {
            'tbody::-webkit-scrollbar': {
              display: 'none',
            },
            tbody: {
              scrollbarWidth: 'none',
            },
          };
        }}>
        <thead style={{ display: 'table', width: '100%' }}>
          <tr>
            {columns?.map((v) => (
              <th key={v.name} style={{ width: v.width }}>
                {v.header}
              </th>
            ))}
          </tr>
        </thead>
        {!isEmpty && (
          <tbody
            style={{
              width: '100%',
              height: bodyHeight,
              overflow: 'auto',
              display: 'block',
            }}>
            {data?.map((item) => (
              <tr key={item.id} style={{ display: 'table', width: '100%' }}>
                {columns?.map((v) => (
                  <td key={v.name} style={{ width: v.width }}>
                    {v.render ? v.render(item) : item[v.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </DefaultTable>
      {isEmpty && (
        <Center
          style={{
            height: bodyHeight,
            flexDirection: 'column',
          }}>
          <BoxIcon size={81} strokeWidth={1} color="#eee" />
          <Text size="md" color="#bbb">
            暂无数据
          </Text>
        </Center>
      )}

      {!!pagination.total && (
        <Group position="right" my={12}>
          <Center>
            <Pagination
              total={Math.ceil(pagination.total / pagination.size)}
              page={pagination.page}
              onChange={(page) => {
                nav(`?size=${size}&page=${page}`);
              }}
            />
            <Select
              mx="md"
              size="xs"
              style={{ width: 100 }}
              data={sizeArr}
              value={`${size}`}
              onChange={(v: string) => {
                setSize(parseInt(v));
                nav(`?size=${v}&page=1`);
              }}
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
            />
          </Center>
        </Group>
      )}
    </Box>
  );
}
