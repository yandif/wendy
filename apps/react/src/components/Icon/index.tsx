import { createFromIconfontCN } from '@ant-design/icons';
import { FunctionComponent } from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1688075_vwak21i2wxj.js',
});

type IconProps = {
  /**
   * 图标类型
   */
  type: string;
};

const Icon: FunctionComponent<IconProps> = (props) => {
  return <IconFont type={props.type} />;
};

export default Icon;
