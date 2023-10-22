import { useRef, useState } from 'react';
import useDebounceEffect from '../useDebounceEffect';
import { DebounceOptions } from '../useDebounceFn';

const useDebounce = <T>(value: T, options: DebounceOptions): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useDebounceEffect(
    () => {
      setDebounced(value);
    },
    [value],
    options,
  );

  return debounced;
};

export default useDebounce;
