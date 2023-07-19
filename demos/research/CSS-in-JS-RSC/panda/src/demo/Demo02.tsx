import { css } from 'styled-system/css';

export const Demo02 = () => {
  return (
    <>
      <div>
        编写样式时，您可能需要根据特定条件应用特定更改，无论是基于断点、CSS
        伪状态、媒体查询还是自定义数据属性。
      </div>
      <div>
        Panda
        允许您编写条件样式，并提供常用条件快捷方式，让您的生活更轻松。假设您想要更改按钮悬停时的背景颜色。你可以这样做：
      </div>
      <span
        className={css({
          bg: 'red.500',
          _hover: { bg: 'red.700' },
        })}>
        hello world
      </span>
      {'=>'}
      <span
        className={css({
          bg: { base: 'red.500', _hover: 'red.700' },
        })}>
        hello world
      </span>
      <div>
        Panda
        中的条件可以嵌套，这意味着您可以将多个条件应用于单个属性或另一个条件。假设您想要更改按钮聚焦和悬停时的背景颜色。你可以这样做：
      </div>
      <button
        className={css({
          bg: { base: 'red.500', _hover: { _focus: 'red.700' } },
        })}>
        Hover me
      </button>
      <p>Panda 包含一组常见的伪状态，您可以使用它们来设置组件的样式：</p>
      <p>
        伪类： _hover 、 _active 、 _focus 、 _focus-visible 、 _focus-within 、
        _disabled
      </p>
      <p>伪元素： _before 、 _after</p>
      <p>媒体查询： sm 、 md 、 lg 、 xl 、 2xl</p>
      <p>
        数据属性选择器： _horizontal 、 _vertical 、 _portrait 、 _landscape
      </p>
      <p>
        如果您需要一个配置条件中未定义的一次性选择器怎么办？您可以使用 css
        函数为任意选择器生成类：
      </p>
      <div
        className={css({
          '&[data-state=closed]': { color: 'red.300' },
          '& > *': { m: '2', p: '1' },
        })}
        data-state="closed">
        <span className={css({ bg: 'green.300' })}>1</span>
        <span className={css({ bg: 'green.300' })}>2</span>
      </div>
    </>
  );
};
