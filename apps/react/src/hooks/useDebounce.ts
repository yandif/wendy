import { useState } from 'react';

const useDebounce = (errorMessage: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (fn: () => any) => async () => {
    setIsLoading(true);
    try {
      await fn();
    } catch (e) {
      console.log(errorMessage, e);
    }
    setIsLoading(false);
  };

  return [isLoading, debounce] as const;
};

export default useDebounce;
