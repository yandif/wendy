import { css, cx } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

const stylesObj: SystemStyleObject = { bg: 'yellow.300' };
const styles2 = css(stylesObj);
const styles = css({
  borderWidth: '1px',
  borderRadius: '8px',
  paddingX: '12px',
  paddingY: '24px',
  bg: 'red.300',
});
const Card = ({ className, ...props }: { className: string }) => {
  // 先创建的样式会被覆盖
  const rootClassName = cx(className, styles2, styles);
  return <div className={rootClassName} {...props} />;
};

export const Demo01 = () => {
  return (
    <>
      <h2>write style</h2>
      <div
        className={css({
          // backgroundColor: 'gainsboro',
          // borderRadius: '9999px',
          // fontSize: '13px',
          // padding: '10px 15px',
          bg: 'gainsboro',
          rounded: '9999px',
          fontSize: '13px',
          p: '10px 15px',
        })}>
        borderRadius 、 backgroundColor 和 padding
        之类的属性可以交换为其简写形式的 rounded 、 bg 和 p 。
      </div>
      <div
        className={css({ bg: 'red.100', color: '|', p: '|', fontSize: '|' })}>
        Panda 使用 TypeScript
        构建，为所有样式属性和简写提供类型安全。大多数样式属性都连接到本机 CSS
        属性或它们在 theme 对象中定义的各自标记值。
      </div>
      <div className={css({ fontSize: 13, paddingTop: 10 })}>
        Panda
        不会自动转换数值，并要求您在需要时使用“px”。这也有助于区分标记值和原始
        CSS 值。(这个是标记)
      </div>
      <div className={css({ fontSize: '13px', paddingTop: '10px' })}>
        Panda
        不会自动转换数值，并要求您在需要时使用“px”。这也有助于区分标记值和原始
        CSS 值。(这个是像素值)
      </div>

      <div
        className={css({
          bg: 'red.400',
          '&:hover': {
            bg: 'orange.400',
          },
          '& span': {
            color: 'green.400',
          },
        })}>
        Panda 提供了不同的嵌套样式声明方式。您可以使用原生 css
        嵌套语法，或内置伪属性，例如 _hover 、 _focus 等。
        <span>（子元素）</span>
        <br></br>
        我们建议不要使用后代选择器，因为它们在管理样式覆盖时可能会导致特异性问题。直接在元素上并置样式是在
        Panda 中编写样式的首选方式。
      </div>
      <div
        className={css({
          bg: 'red.400',
          _hover: {
            bg: 'orange.400',
          },
        })}>
        Panda 提供了一组
        <a
          className={css({ color: 'blue.600' })}
          href="https://panda-css.com/docs/concepts/conditional-styles#reference"
          target="_blank">
          伪 props
        </a>
        ，可用于创建嵌套样式。伪属性带有下划线 _
        前缀，以避免与本机伪选择器发生冲突。
      </div>
      <div>
        有时您可能想要插入全局 CSS，例如添加额外的重置或字体。 Panda
        中的全局样式可以使用 globalCss 属性添加到 panda.config.ts
        中,全局样式插入到样式表的顶部，并且作用域为 @layer base 级联层。
        <pre>{`
        import { css, cx } from '../styled-system/css'
 
        const styles = css({
          borderWidth: '1px',
          borderRadius: '8px',
          paddingX: '12px'
          paddingY: '24px'
        })
         
        const Card = ({ className, ...props }) => {
          const rootClassName = cx(styles, className)
          return <div className={rootClassName} {...props} />
        }
        `}</pre>
      </div>
      <Card className={''} />
      <div>
        在浏览器中调试或预览 DOM 元素时，生成的原子 className
        的长度可能会变得相当长并且有点烦人。如果您希望使用更简洁的类名，请使用
        hash 选项启用类名和 css 变量名哈希。
      </div>
      <pre>
        {`
        export default defineConfig({
          // ...
          hash: true
        })
        `}
      </pre>
      <div>您可能需要通过运行 panda codegen --clean 生成新的代码工件</div>

      <div
        className={cx(css({ color: 'red.500!' }), css({ color: 'green.500' }))}>
        重要样式
      </div>
    </>
  );
};
