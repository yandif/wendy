import { VList } from 'virtua';

const VirtualScroll = () => {
  return (
    <div>
      <VList style={{ height: 'calc(100vh - 32px)', width: 500 }}>
        {Array.from({ length: 1000000 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 30,
              borderBottom: 'solid 1px gray',
              background: 'white',
            }}>
            {i}
          </div>
        ))}
      </VList>
    </div>
  );
};

export default VirtualScroll;
