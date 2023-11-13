import toast from 'react-hot-toast';

import useScrollToBottom from '~/web/hooks/useScrollToBottom';

export default function Scroll() {
  const ref = useScrollToBottom({
    offset: 20,
    callback: async () => {
      toast.success('滚动到底部了');
    },
  });

  return (
    <div
      ref={ref}
      style={{ height: 200, width: 600, margin: 'auto', overflowY: 'auto' }}>
      <div
        style={{
          height: 600,
          width: 0,
          border: '5px dashed pink',
          margin: 'auto',
        }}
      />
    </div>
  );
}
