import { css } from 'styled-system/css';
import {
  aspectRatio,
  center,
  circle,
  container,
  divider,
  flex,
  float,
  grid,
  gridItem,
  hstack,
  square,
  stack,
  vstack,
  wrap,
} from 'styled-system/patterns';
import { Center, VStack, panda } from 'styled-system/jsx';

export const Demo04 = () => {
  return (
    <div
      className={css({
        '& > h1': { fontSize: '3xl', fontWeight: 'bold' },
        '& > h2': { fontSize: '2xl', fontWeight: 'bold' },
        '& > h3': { fontSize: 'xl', fontWeight: 'bold' },
      })}>
      <h1>模式</h1>
      <p>
        模式是布局基元，可用于轻松创建健壮且响应灵敏的布局。 Panda
        带有预定义的模式，如 stack、hstack、vstack、wrap
        等。这些模式可以用作函数或 JSX
        元素。将模式视为一组预定义的样式，以减少重复并提高可读性。您可以根据需要重写属性，就像在
        css 函数中一样。
      </p>
      <h2>预定义模式</h2>
      <h3>container</h3>
      <p>
        容器模式用于创建具有最大宽度并将内容居中的容器。默认情况下，容器设置以下属性：
      </p>
      <pre>
        {`
        maxWidth: 8xl
        marginX: auto
        position: relative
        paddingX: { base: 4, md: 6, lg: 8 }
        `}
      </pre>
      <div className={container()}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>stack</h3>
      <p>
        堆栈模式是一种布局基元，可用于创建垂直或水平的元素堆栈。stack
        函数接受以下属性：
      </p>
      <ol>
        <li>direction ：堆栈的弯曲方向。可以是 vertical 或 horizontal 。</li>
        <li>gap ：堆栈中元素之间的间隙。</li>
        <li>align ：css align-items 属性的别名。</li>
        <li>justify ：css justify-content 属性的别名。</li>
      </ol>
      <div
        className={stack({
          gap: '6',
          padding: '4',
        })}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>HStack</h3>
      <p>
        HStack 模式是 stack 模式的包装器，它将 direction 属性设置为 horizontal
        ，并将元素垂直居中。
      </p>
      <div className={hstack({ gap: '6' })}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>VStack</h3>
      <p>
        VStack 模式是 stack 模式的包装器，它将 direction 属性设置为 vertical
        ，并将元素水平居中。
      </p>
      <div className={vstack({ gap: '6' })}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>Wrap</h3>
      <p>
        换行模式用于在元素之间添加空间，如果空间不足，则会自动换行。wrap
        函数接受以下属性：
      </p>
      <p>gap ：堆栈中元素之间的间隙。</p>
      <p>columnGap ：堆栈中元素之间的水平间隙。</p>
      <p>rowGap ：堆栈中元素之间的垂直间隙。</p>
      <p>align ：css align-items 属性的别名。</p>
      <p>justify ：css justify-content 属性的别名。</p>
      <div className={wrap({ gap: '6' })}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>Aspect Ratio(不生效，不知道是不是我写的有问题)</h3>
      <p>
        纵横比模式用于创建具有固定纵横比的容器。它在显示图像、地图、视频和其他媒体时使用。注意：在大多数情况下，我们建议使用
        aspectRatio 属性而不是模式。aspectRatio 函数接受以下属性：
      </p>
      <p>ratio ：容器的纵横比。可以是数字或字符串。</p>
      <div className={aspectRatio({ ratio: 16 / 9 })}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m1"
          title="Google map"
          frameBorder="0"
        />
      </div>
      <h3>flex</h3>
      <p>
        Flex 模式用于创建 Flex 容器并为 flex 属性提供一些快捷方式。flex
        函数接受以下属性：
      </p>
      <p>
        direction ：容器的弯曲方向。可以是 row 、 column 、 row-reverse 或
        column-reverse <br />
        wrap ：是否包裹弹性项目。该值是一个布尔值。 <br />
        align ：css align-items 属性的别名。
        <br />
        justify ：css justify-content 属性的别名。
        <br />
        basis ：css flex-basis 属性的别名。
        <br />
        grow ：css flex-grow 属性的别名。
        <br />
        shrink ：css flex-shrink 属性的别名。
      </p>
      <div className={flex({ direction: 'row', align: 'center', gap: '10' })}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>Center</h3>
      <p>中心模式用于将容器的内容居中。center 函数接受以下属性：</p>
      <p>inline ：是否使用 inline-flex 或 flex 作为容器。该值是一个布尔值。</p>
      <div className={center({ bg: 'red.200', inline: true, h: 10, w: 10 })}>
        <div className={css({ h: 4, w: 4, bg: 'red.600' })}></div>
      </div>
      <h3>Float</h3>
      <p>
        浮动模式用于将元素锚定到容器的顶部、底部、左侧或右侧,它需要一个具有
        position: relative 样式的父元素。float 函数接受以下属性：
        <br />
        placement ：元素的位置。可以是 top-start 、 top 、 top-end 、
        bottom-start 、 bottom 、 bottom-end 、 left-start 、 left 、 left-end
        、 right-start 、 right 或 right-end 。
        <br />
        offset ：元素距离容器边缘的偏移量。可以是数字或字符串。
        <br />
        offsetX ：与 offset 相同，但仅适用于水平轴。
        <br />
        offsetY ：与 offset 相同，但仅适用于垂直轴。
      </p>
      <div className={css({ position: 'relative', bg: 'red.100', h: 16 })}>
        <div className={float({ placement: 'top-start', offset: '-1' })}>
          30
        </div>
      </div>
      <h3>Grid</h3>
      <p>用于创建网格布局。</p>
      <p>
        grid 函数接受以下属性：
        <br />
        columns ：网格中的列数。
        <br />
        gap ：堆栈中元素之间的间隙。
        <br />
        columnGap ：堆栈中元素之间的水平间隙。
        <br />
        rowGap ：堆栈中元素之间的垂直间隙
        <br />
        minChildWidth ：子元素换行前的最小宽度。
      </p>
      <div className={grid({ columns: 3, gap: '6' })}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>Grid Item</h3>
      <p>
        网格项模式用于设置网格容器子项的样式。 <br />
        gridItem 函数接受以下属性： <br />
        colSpan ：项目跨越的列数。 <br />
        rowSpan ：项目跨越的行数。 <br />
        rowStart ：项目开始的行。 <br />
        rowEnd ：项目结束的行。 <br />
        colStart ：项目开始的列。 <br />
        colEnd ：项目结束的列。 <br />
      </p>
      <div className={grid({ columns: 3, gap: '6' })}>
        <div className={gridItem({ colSpan: 2 })}>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Second</div>
        <div>Third</div>
      </div>
      <h3>Divider</h3>
      <p>分隔线图案用于创建水平或垂直分隔线。</p>
      <p>
        函数接受以下属性： <br />
        orientation ：分隔线的方向。可以是 horizontal 或 vertical 。 <br />
        thickness ：分隔线的厚度。可以是大小标记或任意值。 <br />
        color ：分隔线的颜色。可以是颜色标记或任意值。
      </p>
      <div className={stack()}>
        <button>First</button>
        <div
          className={divider({ orientation: 'horizontal', color: 'red.500' })}
        />
        <button>Second</button>
      </div>
      <div className={hstack({ h: 10 })}>
        <button>First</button>
        <div
          className={divider({
            orientation: 'vertical',
            thickness: '1',
            color: 'red.500',
          })}
        />
        <button>Second</button>
      </div>
      <h3>Circle</h3>
      <p>
        圆形图案用于创建圆形。 circle 函数接受以下属性： <br />
        size ：圆的大小。可以是大小标记或任意值。
      </p>
      <div className={circle({ size: '12', bg: 'red.300' })} />
      <h3>Square</h3>
      <p>
        方形图案用于创建宽度和高度相等的正方形。square 函数接受以下属性：
        <br /> size ：正方形的大小。可以是大小标记或任意值。
      </p>
      <div className={square({ size: '12', bg: 'red.300' })} />

      <h3>JSX</h3>
      <VStack gap="6" mt="4">
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <Center>4</Center>
      </VStack>
      <panda.button h={10}>按钮</panda.button>
    </div>
  );
};
