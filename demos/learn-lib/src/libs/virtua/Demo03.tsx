import { Chrome } from '../../components/Chrome';
import { VGrid } from 'virtua';

export const Demo03 = () => {
  return (
    <Chrome center={false} tall label="水平滚动与垂直滚动">
      <div className="px-60">
        <VGrid style={{ height: 400 }} row={1000} col={500}>
          {({ rowIndex, colIndex }) => (
            <div
              style={{
                width: ((colIndex % 3) + 1) * 100,
                border: 'solid 1px gray',
                background: 'white',
              }}>
              {rowIndex} / {colIndex}
            </div>
          )}
        </VGrid>
      </div>
    </Chrome>
  );
};
