import { useState, useMemo } from 'react';

const useBoolean = (defaultValue: boolean = false) => {
  const [value, setValue] = useState(defaultValue);

  const actions = useMemo(() => {
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    const toggle = () => setValue(prev => !prev);
    return {
      set: setValue,
      toggle,
      setTrue,
      setFalse,
    };
  }, [value]);

  return [value, actions];
};

export default useBoolean;
