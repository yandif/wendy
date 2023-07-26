import { VList } from 'virtua';
import { Chrome } from '../../components/Chrome';

export const Demo02 = () => {
  return (
    <Chrome center={false} tall label="水平滚动">
      <div className="px-60">
        <VList style={{ height: 400 }} horizontal>
          {Array.from({ length: 1000 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: Math.floor(Math.random() * 10) * 10 + 10,
                borderRight: 'solid 1px gray',
                background: 'white',
              }}>
              {i}
            </div>
          ))}
        </VList>
      </div>
    </Chrome>
  );
};
