import { RecipeVariantProps, css } from 'styled-system/css';
import { cva } from 'styled-system/css';
import { panda } from 'styled-system/jsx';
import { button as ibutton } from 'styled-system/recipes';

const button = cva({
  base: {
    display: 'inline-flex',
  },
  variants: {
    visual: {
      solid: { bg: 'red.200', color: 'white' },
      outline: { borderWidth: '1px', borderColor: 'red.200' },
    },
    size: {
      sm: { padding: '4', fontSize: '12px' },
      lg: { padding: '8', fontSize: '24px' },
    },
  },
  defaultVariants: {
    visual: 'solid',
    size: 'lg',
  },
});

// 复合变体
const button2 = cva({
  base: {
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
  },

  variants: {
    size: {
      small: {
        fontSize: '14px',
        padding: '4px 8px',
      },
      large: {
        fontSize: '18px',
        padding: '12px 24px',
      },
    },
    color: {
      primary: {
        backgroundColor: 'blue',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'gray',
        color: 'black',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },

  // compound variants
  compoundVariants: [
    // apply small size variant when both small size and primary color are selected
    {
      size: 'small',
      color: 'primary',
      css: {
        border: '2px solid blue',
      },
    },
    // apply large size variant when both large size and secondary color are selected and the button is disabled
    {
      size: 'large',
      color: 'secondary',
      disabled: true,
      css: {
        backgroundColor: 'lightgray',
        color: 'darkgray',
        border: 'none',
      },
    },
  ],
});

const buttonStyle = cva({
  base: {
    color: 'red',
    textAlign: 'center',
  },
  variants: {
    size: {
      small: {
        fontSize: '1rem',
      },
      large: {
        fontSize: '2rem',
      },
    },
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>; // { size?: 'small' | 'large' }

export const Button = panda('button', buttonStyle);

export const Demo05 = () => {
  return (
    <div
      className={css({
        '& > h1': { fontSize: '3xl', fontWeight: 'bold' },
        '& > h2': { fontSize: '2xl', fontWeight: 'bold' },
        '& > h3': { fontSize: 'xl', fontWeight: 'bold' },
      })}>
      <h1>食谱</h1>
      <p>
        Panda 提供了一种编写 CSS-in-JS
        的方法，具有更好的性能、开发人员体验和可组合性。其主要功能之一是能够使用类型安全的运行时
        API 创建多变体样式。
        <br />
        配方由四个属性组成：
        <br />
        base ：组件的基本样式
        <br />
        variants ：组件的不同视觉样式
        <br />
        compoundVariants ：组件变体的不同组合
        <br />
        defaultVariants ：组件的默认变量值
      </p>
      <h2>原子配方（或 cva）</h2>
      <p>
        原子配方是一种使用类型安全的运行时 API
        创建多变体原子样式的方法。它们是使用受 Class Variance Authority 启发的
        cva 函数定义的。 cva 函数接受一个对象作为其参数。
      </p>
      <button className={button({ visual: 'solid', size: 'sm' })}>
        Click Me
      </button>
      <button className={button({ visual: 'outline', size: 'sm' })}>
        Click Me
      </button>
      <p>
        创建配方时，Panda 将提前为每个变体和复合变体 css 提取并生成
        CSS，作为原子类。
      </p>
      <button className={button2({ size: 'small', color: 'primary' })}>
        Click Me
      </button>
      <button
        className={button2({
          size: 'large',
          color: 'secondary',
          disabled: true,
        })}>
        Click Me
      </button>
      <Button size="large"> hello world</Button>
      <p>
        配置配方是及时提取和生成的，这意味着无论配置中的配方有多少，生成的 CSS
        中只会存在您使用的配方和变体。 <br /> 配置配方采用以下附加属性：
        <br /> name ：菜谱的名称。用于生成的类名,
        <br /> jsx ：使用配方的 JSX 组件数组。默认为配方名称的大写版本
        <br /> description ：菜谱的可选描述（在 js-doc 注释中使用）
      </p>
      <p>要定义配置配方，请导入 defineRecipe 辅助函数</p>
      <p>
        要使用配方，您可以从 /recipes 入口点导入配方并在组件中使用它。 Panda
        跟踪配方的使用情况，并且仅生成应用程序中使用的变体的 CSS。生成的 CSS
        注册在 recipe 级联层下，其类名与配方变体名称模式
        recipe-name--variant-name 匹配
      </p>
      <button className={ibutton({ shape: 'square' })}>Click me</button>
      <button className={ibutton({ shape: 'circle' })}>Click me</button>

      <p>
        在配置中创建的食谱有一个特殊功能；它们可以根据特定的断点或条件来应用。
      </p>
    </div>
  );
};
