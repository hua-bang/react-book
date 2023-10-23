import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

interface Actions<T> {
  add: (key: T) => void;
  remove: (key: T) => void;
  reset: () => void;
}

const useSet = <T>(initialValue?: Iterable<T>): [Set<T>, Actions<T>] => {
  const getInitValue = () => new Set<T>(initialValue);

  const [set, setSet] = useState<Set<T>>(getInitValue);

  const add = (key: T) => {
    setSet(prev => {
      const tempSet = new Set(prev);
      tempSet.add(key);
      return tempSet;
    });
  };

  const remove = (key: T) => {
    setSet(prev => {
      const tempSet = new Set(prev);
      tempSet.delete(key);
      return tempSet;
    });
  };

  const reset = () => {
    setSet(getInitValue);
  };

  const actions: Actions<T> = {
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
  };

  return [set, actions];
};

export default useSet;
