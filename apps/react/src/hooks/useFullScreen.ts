import { useCallback, useState } from 'react';

const useFullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const requestFullScreen = useCallback(() => {
    const element: {
      requestFullscreen?: any;
      webkitRequestFullscreen?: any;
      mozRequestFullScreen?: any;
      msRequestFullscreen?: any;
    } = document.documentElement;

    const requestMethod =
      element.requestFullscreen ||
      element.webkitRequestFullscreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullscreen;
    if (requestMethod) {
      requestMethod.call(element);
    }
    setFullScreen(true);
  }, []);

  const exitFullScreen = useCallback(() => {
    const element: {
      exitFullscreen?: any;
      mozCancelFullScreen?: any;
      webkitExitFullscreen?: any;
      msExitFullscreen?: any;
    } = document;

    const exitMethod =
      element.exitFullscreen ||
      element.mozCancelFullScreen ||
      element.webkitExitFullscreen ||
      element.msExitFullscreen;
    if (exitMethod) {
      exitMethod.call(document);
    }
    setFullScreen(false);
  }, []);

  return [fullScreen, requestFullScreen, exitFullScreen] as const;
};

export default useFullScreen;
