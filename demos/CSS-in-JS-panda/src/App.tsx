import { useState } from 'react';
import { css } from 'styled-system/css';
import { Demo01 } from './demo/Demo01';
import { Demo02 } from './demo/Demo02';
import { Demo03 } from './demo/Demo03';
import { Demo04 } from './demo/Demo04';
import { Demo05 } from './demo/Demo05';

const ComponentArr = [Demo01, Demo02, Demo03, Demo04, Demo05];

function App() {
  const [i, setI] = useState(0);
  const Component = ComponentArr[i];
  return (
    <div>
      <div className={css({ p: '16px' })}>
        {ComponentArr.map((v, _i) => {
          return (
            <button
              key={_i}
              className={
                i === _i
                  ? css({ m: '16px', bg: 'yellow.500' })
                  : css({ m: '16px', cursor: 'pointer' })
              }
              onClick={() => setI(_i)}>
              Demo{_i + 1}
            </button>
          );
        })}
      </div>
      <div className={css({ p: '24px' })}>
        <Component />
      </div>
    </div>
  );
}

export default App;
