import { useEffect, useRef } from 'react';

const useUnmountedRef = (): React.MutableRefObject<boolean> => {
  const unmountedRef = useRef<boolean>(false);

  useEffect(() => {
    unmountedRef.current = true;
    return () => {
      unmountedRef.current = false;
    };
  }, []);

  return unmountedRef;
};

export default useUnmountedRef;
