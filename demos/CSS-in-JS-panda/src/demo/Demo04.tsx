import { css } from 'styled-system/css';
import {
  aspectRatio,
  container,
  hstack,
  stack,
  vstack,
  wrap,
} from 'styled-system/patterns';

export const Demo04 = () => {
  return (
    <>
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
      <p>Flex 模式用于创建 Flex 容器并为 flex 属性提供一些快捷方式。</p>
    </>
  );
};
