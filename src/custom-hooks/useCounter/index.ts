import { useState } from 'react';

interface Options {
  max: number;
  min: number;
}

export interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
}

export type ValueParam = number | ((c: number) => number);

function getTargetValue(val: number, options: Options) {
  const { min, max } = options;
  let target = val;

  if (max !== undefined) {
    target = Math.min(max, target);
    console.log(target);
  }
  if (min !== undefined) {
    target = Math.max(min, target);
  }

  return target;
}

const useCounter = (initialVal = 0, options: Options) => {
  const { min, max } = options;

  const [count, setCount] = useState<number>(() => {
    return getTargetValue(initialVal, {
      min,
      max,
    });
  });

  const setValue = (value: ValueParam) => {
    setCount(prev => {
      const target = typeof value === 'number' ? value : value(prev);
      return getTargetValue(target, {
        max,
        min,
      });
    });
  };

  const inc = (delta: number = 1) => {
    setValue(prev => prev + delta);
  };

  const dec = (delta: number = 1) => {
    setValue(prev => prev - delta);
  };

  const set = (value: ValueParam) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialVal);
  };

  const actions: Actions = {
    inc,
    dec,
    set,
    reset,
  };

  return [count, actions];
};

export default useCounter;
