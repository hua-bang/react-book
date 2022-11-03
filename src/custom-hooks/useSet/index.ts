import React, { useMemo, useState } from 'react';

interface Actions<T> {
  add: (val: T) => void;
  remove: (value: T) => void;
  reset: () => void;
}

const useSet = <T>(initialVal?: Iterable<T>) => {
  const getInitialVal = () =>
    initialVal === undefined ? new Set<T>() : new Set(initialVal);

  const [set, setSet] = useState<Set<T>>(() => getInitialVal());

  const actions: Actions<T> = useMemo(() => {
    const add = (val: T) => {
      if (set.has(val)) {
        return;
      }
      setSet(prev => {
        const tempSet = new Set(prev);
        tempSet.add(val);
        return tempSet;
      });
    };
    const remove = (val: T) => {
      if (!set.has(val)) {
        return;
      }
      setSet(prev => {
        const tempSet = new Set(prev);
        tempSet.delete(val);
        return tempSet;
      });
    };
    const reset = () => {
      setSet(() => getInitialVal());
    };
    return {
      add,
      remove,
      reset,
    };
  }, [initialVal]);

  return [set, actions];
};

export default useSet;
