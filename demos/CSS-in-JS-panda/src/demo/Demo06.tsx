import { css } from 'styled-system/css';

export const Demo06 = () => {
  return (
    <div
      className={css({
        '& > h1': { fontSize: '3xl', fontWeight: 'bold' },
        '& > h2': { fontSize: '2xl', fontWeight: 'bold' },
        '& > h3': { fontSize: 'xl', fontWeight: 'bold' },
      })}>
      <h1>JSX Style Props</h1>
      <p>
        Style props 允许您通过将 css 属性作为“props”传递给您的组件，在 JSX
        中快速构建 UI 组件。 Panda 将通过静态分析提取样式道具并在构建时生成
        CSS。
      </p>
      <p>
        虽然使用 Panda 的 className
        属性和函数可以走得很远，但样式属性提供了一种更符合人体工程学的方式来表达样式。
      </p>
      <p>
        如果您使用 Chakra UI、Styled System 或 Theme UI，您会立即感到宾至如归😊
      </p>

      <p>
        Panda 中默认关闭使用 JSX 样式属性，但您可以通过使用 panda 配置中的
        jsxFramework 属性来选择启用此功能。
      </p>
      <pre>
        {`
        export default defineConfig({
          // ...
          jsxFramework: 'react'
        })
        `}
      </pre>

      <p>
        然后生成 JSX 运行时 <code>pnpm panda codegen --clean</code>
      </p>
      <pre>
        {`
        import { styled } from '../styled-system/jsx'
 
        const Button = ({ children }) => (
          <styled.button bg="blue.500" color="white" py="2" px="4" rounded="md">
            {children}
          </styled.button>
        )
        `}
      </pre>
      <p>工厂模式</p>
      <pre>
        {`
        import { styled } from '../styled-system/jsx'
        import { Button } from 'component-library'
         
        const StyledButton = styled(Button)
         
        const App = () => (
          <StyledButton bg="blue.500" color="white" py="2" px="4" rounded="md">
            Button
          </StyledButton>
        )
        `}
      </pre>
      <p>配方</p>
      <pre>
        {`
        import { styled } from '../styled-system/jsx'
 
        const Button = styled('button', {
          base: {
            py: '2',
            px: '4',
            rounded: 'md'
          },
          variants: {
            variant: {
              primary: {
                bg: 'blue.500',
                color: 'white'
              },
              secondary: {
                bg: 'gray.500',
                color: 'white'
              }
            },
          }
        })
         
        const App = () => <Button variant="secondary" mt="10px">Button</Button>
        `}
      </pre>
      <p>JSX 模式</p>
      <pre>
        {`
        import { Stack, Circle } from '../styled-system/jsx'
 
        const App = () => (
          <Stack gap="4" align="flex-start">
            <button>Button</button>
            <Circle size="4" bg="red.300">4</Circle>
          </Stack>
        )
        `}
      </pre>
      <p>使用 JSXStyleProps 获取与 JSX 元素兼容的样式对象的类型。</p>
      <pre>
        {`
        import { styled } from '../styled-system/jsx'
        import type { JSXStyleProps } from '../styled-system/types'
         
        type ButtonProps = {
          color?: JSXStyleProps['color']
        }
         
        const Button = (props: ButtonProps) => {
          return <styled.button {...props}>
        }
        `}
      </pre>
      <p>使用 HTMLStyledProps 类型来获取除样式属性之外的元素类型。</p>
      <pre>
        {`
        import { styled } from '../styled-system/jsx'
        import type { HTMLStyledProps } from '../styled-system/jsx'
         
        type ButtonProps = HTMLStyledProps<'button'> 
         
        const Button = (props: ButtonProps) => {
          return <styled.button {...props}>
        }
        `}
      </pre>
      <p>
        Panda
        提供的每个模式都有一个相应的类型，您可以使用它来确保组件中的类型安全。
      </p>
      <pre>
        {`
        import { Stack } from '../styled-system/jsx'
        import type { StackProps } from '../styled-system/jsx'
        `}
      </pre>
    </div>
  );
};
