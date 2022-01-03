import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

interface Actions<T> {
  add: (key: T) => void;
  remove: (key: T) => void;
  reset: () => void;
}

const useSet = <T>(initialValue: Iterable<T>): [Set<T>, Actions<T>] => {
  const getInitialVal = () => {
    return initialValue === undefined ? new Set<T>() : new Set(initialValue);
  };

  const [set, setSet] = useState(() => getInitialVal());

  const add = (key: T) => {
    if (set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: T) => {
    if (!set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setSet(() => getInitialVal());

  const actions: Actions<T> = {
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
  };

  return [set, actions];
};

export default useSet;
