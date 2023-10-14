import { useCallback, useEffect, useMemo, useState } from 'react';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';

export interface useCounterOptions {
  min?: number;
  max?: number;
}

export interface useCounterActions {
  inc: () => void;
  dec: () => void;
  set: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}

const checkValValidate = (value: number, options?: useCounterOptions) => {
  if (!options) {
    return true;
  }

  const { min, max } = options;

  if (
    (min !== undefined && min > value) ||
    (max !== undefined && max < value)
  ) {
    return false;
  }

  return true;
};

const checkInitialVal = (initialVal?: number, options?: useCounterOptions) => {
  if (!isDev) {
    return;
  }

  if (initialVal === undefined || !options) {
    return;
  }

  const validateRes = checkValValidate(initialVal, options);

  if (!validateRes) {
    console.log('Your initialVal is invalidate');
  }
};

const useCounter = (initialVal = 0, options?: useCounterOptions) => {
  const [count, setCount] = useState(initialVal || 0);

  const setCountProxy: React.Dispatch<React.SetStateAction<
    number
  >> = useCallback(patch => {
    setCount(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;

      const newStateValidate = checkValValidate(newState, options);

      return newStateValidate ? newState : prevState;
    });
  }, []);

  const actions: useCounterActions = useMemo(
    () => ({
      inc: () => setCountProxy(prev => prev + 1),
      dec: () => setCountProxy(prev => prev - 1),
      set: setCountProxy,
      reset: () => setCountProxy(initialVal),
    }),
    [],
  );

  useEffect(() => {
    checkInitialVal(initialVal, options);
  }, []);

  return [count, actions];
};

export default useCounter;
