import { useEffect, useRef, useState } from 'react';

export default function useScrollToBottom({
  offset = 0,
  callback = () => {},
}: {
  offset?: number;
  callback: () => void;
}) {
  const [ref, setRef] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const top = useRef(0);

  useEffect(() => {
    if (!ref) return;

    const handleScroll = async (e: any) => {
      const { clientHeight, scrollHeight, scrollTop } = e.target;
      if (scrollTop < top.current) {
        //up
        top.current = scrollTop;
        return;
      }
      top.current = scrollTop;

      if (scrollTop + clientHeight + offset < scrollHeight || isLoading) {
        setIsEnd(false);
        return;
      }
      if (isEnd) return;
      setIsEnd(true);
      setIsLoading(true);
      await callback();
      setIsLoading(false);
    };

    ref.addEventListener('scroll', handleScroll);
    return () => {
      ref.removeEventListener('scroll', handleScroll);
    };
  }, [ref, callback, offset, isLoading, isEnd]);

  return setRef;
}
