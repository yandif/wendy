import type { MantineTheme } from '@mantine/core';
import { Group, Image, Text } from '@mantine/core';
import type { DropzoneStatus } from '@mantine/dropzone';
import type { Icon } from '@tabler/icons-react';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  if (status.accepted) {
    return theme.colors[theme.primaryColor][
      theme.colorScheme === 'dark' ? 4 : 6
    ];
  }
  if (status.rejected) {
    return theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6];
  }
  if (theme.colorScheme === 'dark') {
    return theme.colors.dark[0];
  }
  return theme.colors.gray[5];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<Icon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <IconUpload {...props} />;
  }

  if (status.rejected) {
    return <IconX {...props} />;
  }

  return <IconPhoto {...props} />;
}
export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  imgSrc: string | undefined,
) => {
  if (imgSrc) {
    return (
      <Image
        styles={{
          root: { minHeight: 120 },
          placeholder: { minHeight: 120 },
        }}
        radius="sm"
        src={imgSrc}
        alt="背景图片"
        withPlaceholder
        placeholder={'图片不存在'}
      />
    );
  }

  return (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 120, pointerEvents: 'none' }}>
      <ImageUploadIcon
        status={status}
        style={{ color: getIconColor(status, theme) }}
        size={80}
      />

      <div>
        <Text size="xl" inline>
          拖拽上传图片
        </Text>
      </div>
    </Group>
  );
};
