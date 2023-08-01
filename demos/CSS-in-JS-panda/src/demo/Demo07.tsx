import { css } from 'styled-system/css';

export const Demo07 = () => {
  return (
    <div
      className={css({
        '& > h1': { fontSize: '3xl', fontWeight: 'bold' },
        '& > h2': { fontSize: '2xl', fontWeight: 'bold' },
        '& > h3': { fontSize: 'xl', fontWeight: 'bold' },
      })}>
      <h1>设计令牌</h1>
      <p>
        设计令牌是一种与平台无关的方式来管理应用程序或网站中的设计决策。它是描述任何基本/原子视觉样式的属性集合。每个属性都是一个键值对。
        <br />
        设计令牌包含以下属性：
        <br />
        value ：令牌的值。这可以是任何有效的 CSS 值。
        <br />
        description ：令牌用途的可选描述。
      </p>
    </div>
  );
};
