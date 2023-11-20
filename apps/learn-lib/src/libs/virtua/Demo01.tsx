import { VList } from 'virtua';
import { Chrome } from '../../components/Chrome';

export const Demo01 = () => {
  return (
    <Chrome center={false} tall label="垂直滚动">
      <div className="px-60">
        <VList style={{ height: 400 }}>
          {Array.from({ length: 1000 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: Math.floor(Math.random() * 10) * 10 + 10,
                borderBottom: 'solid 1px gray',
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
