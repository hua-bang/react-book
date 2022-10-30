import { useEffect, useRef } from 'react';

interface NonReturnFn {
  (): void;
}

const useUnmount = (fn: NonReturnFn) => {
  const fnRef = useRef<NonReturnFn>(fn);
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
};

export default useUnmount;
