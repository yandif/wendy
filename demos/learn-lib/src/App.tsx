import classNames from 'classnames';
import { useState } from 'react';
import { demos } from './demo';
import './libs/dayjs';
import './libs/lodash';
import './libs/ts-pattern';

const App = () => {
  const [title, setTitle] = useState(demos[0].title);
  const { component: Component } = demos.find((v) => v.title === title)!;

  return (
    <div className="flex bg-gray-50 h-[100vh] overflow-auto">
      <div className="w-[300px] p-6 pr-0">
        {demos.map((v) => {
          return (
            <div
              className={classNames(
                {
                  'bg-red-100': title === v.title,
                  'hover:bg-red-50 cursor-pointer': title !== v.title,
                },
                'mx-2 p-2 rounded-md text-ellipsis overflow-hidden whitespace-nowrap',
              )}
              key={v.title}
              title={v.title}
              onClick={() => {
                setTitle(v.title);
              }}>
              {v.title}
            </div>
          );
        })}
      </div>
      <div className="flex-1 p-6">
        <Component />
      </div>
    </div>
  );
};

export default App;
