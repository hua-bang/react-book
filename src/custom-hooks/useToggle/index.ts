import { useState, useMemo } from 'react';
interface Actions<T> {
  set: (val: T) => void;
  setLeft: () => void;
  setRight: () => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [T, Actions<T>];
function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U,
): [T | U, Actions<T | U>];

function useToggle<T, U>(
  defaultValue: T = false as T,
  reverseValue?: U,
): [T | U, Actions<T | U>] {
  const [value, setValue] = useState<T | U>(defaultValue);

  const actions: Actions<T | U> = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined
      ? !defaultValue
      : reverseValue) as T | U;
    const set = (val: T | U) => setValue(val);
    const setLeft = () => setValue(defaultValue);
    const setRight = () => setValue(reverseValueOrigin);
    const toggle = () =>
      setValue(s => (s === defaultValue ? reverseValueOrigin : defaultValue));

    return {
      set,
      setLeft,
      setRight,
      toggle,
    };
  }, [value]);

  return [value, actions];
}

export default useToggle;
