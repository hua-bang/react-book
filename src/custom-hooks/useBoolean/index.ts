import { useState, useMemo } from 'react';

interface Actions {
  toggle: () => void;
  set: (val: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

const useBoolean = (defaultValue: boolean) => {
  const [val, setVal] = useState<boolean>(defaultValue);

  const actions: Actions = useMemo(
    () => ({
      toggle: () => setVal(prev => !prev),
      set: setVal,
      setTrue: () => setVal(true),
      setFalse: () => setVal(false),
    }),
    [],
  );
  return [val, actions];
};

export default useBoolean;
