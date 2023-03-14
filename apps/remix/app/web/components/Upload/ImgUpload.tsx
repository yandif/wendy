import { Group, Image, rem, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

export function UploadImage(
  props: Partial<DropzoneProps> & {
    imgSrc: string | undefined;
  },
) {
  const theme = useMantineTheme();
  
  if (props.imgSrc) {
    return (
      <Image
        styles={{
          root: { minHeight: 120 },
          placeholder: { minHeight: 120 },
        }}
        radius="sm"
        src={props.imgSrc}
        alt="背景图片"
        withPlaceholder
        placeholder={'图片不存在'}
      />
    );
  }

  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}>
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            拖拽上传图片
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
