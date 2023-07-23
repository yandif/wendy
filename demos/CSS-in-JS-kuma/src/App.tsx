import { useState } from 'react';

import { Demo01 } from './demo/Demo01';
import { Demo02 } from './demo/Demo02';
import { Demo03 } from './demo/Demo03';

const ComponentArr = [Demo01, Demo02, Demo03];

function App() {
  const [i, setI] = useState(0);
  const Component = ComponentArr[i];
  return (
    <div>
      <div>
        {ComponentArr.map((v, _i) => {
          return (
            <button key={_i} onClick={() => setI(_i)}>
              Demo{_i + 1}
            </button>
          );
        })}
      </div>
      <div>
        <Component />
      </div>
    </div>
  );
}

export default App;
