import { css } from 'styled-system/css';

export const Demo03 = () => {
  return (
    <>
      <h1>响应式设计</h1>
      <p>
        响应式设计是现代 Web
        开发的一个基本方面，允许网站和应用程序无缝适应不同的屏幕尺寸和设备。
      </p>
      <p>
        Panda
        提供了一套全面的响应式实用程序和功能，以方便创建响应式布局。它允许您通过不同断点的条件样式来完成此操作。
      </p>
      <p>假设您想更改大屏幕上文本的字体粗细，可以这样做：</p>
      <span
        className={css({
          fontWeight: 'medium',
          lg: { fontWeight: 'bold' },
        })}>
        Text
      </span>
      <p>
        当您编写响应式样式时，Panda 使用移动优先的断点系统并利用最小宽度媒体查询
        @media(min-width) 。
      </p>
      <p>Panda 默认提供五个断点：</p>
      <pre>{`
      const breakpoints = {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
      `}</pre>

      <p>简介语法：</p>
      <span
        className={css({
          fontWeight: { base: 'medium', lg: 'bold' },
        })}>
        Text
      </span>

      <p>定位断点范围：</p>
      <p>
        默认情况下，分配给特定断点的样式将在该断点处生效，并将在较大的断点处作为应用的样式持续存在。如果您希望在特定范围的断点处于活动状态时专门应用实用程序，Panda
        提供将样式限制为该特定范围的属性。要构造该属性，请使用驼峰命名法格式的“To”表示法组合最小和最大断点。
      </p>
      <p>假设我们要在 md 和 xl 断点之间应用样式，我们使用 mdToXl 属性：</p>
      <span
        className={css({
          fontWeight: { mdToXl: 'bold' },
        })}>
        Text
      </span>

      <p>定位单个断点</p>
      <p>
        要定位单个断点，只需将后缀“Only”添加到驼峰格式的断点名称中即可轻松实现。
      </p>
      <p>假设我们只想在 lg 断点中应用样式，我们使用 lgOnly 属性：</p>
      <span
        className={css({
          fontWeight: { lgOnly: 'bold' },
        })}>
        Text
      </span>
      <p>自定义断点</p>
      <p>
        当遇到某些场景时，可能有必要根据应用程序的需求建立自定义断点。为此，建议使用常用的别名，例如
        sm 、 md 、 lg 和 xl 。 为了定义自定义断点，您可以通过将它们作为 Panda
        配置中的对象传递来轻松完成此操作。注意：确保断点的 CSS
        单位一致。使用所有像素 ( px ) 或所有 em ，但不要混合使用它们。
      </p>
      <pre>{`
      export default defineConfig({
        // ...
        theme: {
          extend: {
            breakpoints: {
              sm: '640px',
              md: '768px',
              lg: '1024px',
              xl: '1280px',
              '2xl': '1536px'
            }
          }
        }
      })
      `}</pre>

      <p>隐藏元素</p>
    </>
  );
};
