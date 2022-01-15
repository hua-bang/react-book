import { useState, useCallback } from 'react';
import { isFunction } from '../../utils';

interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

const useLocalStorageState = <T>(
  key: string,
  options: Options<T>,
): [T | undefined, (value?: T | ((prev: T) => T)) => void] => {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

  const deserializeValue = (localStorageValue: string) => {
    return localStorageValue === 'undefined'
      ? undefined
      : deserializer(localStorageValue);
  };

  const localStorageValue = localStorage.getItem(key);

  const defaultValue = localStorageValue
    ? deserializeValue(localStorageValue)
    : options.defaultValue;

  const [state, setState] = useState<T>(defaultValue);

  const setLocalStorageState = useCallback(batch => {
    setState(prevState => {
      const nextState = isFunction(batch) ? batch(prevState) : batch;
      if (!nextState) {
        localStorage.setItem(key, serializer(''));
      } else {
        localStorage.setItem(key, serializer(nextState));
      }
      return nextState;
    });
  }, []);

  return [state, setLocalStorageState];
};

export default useLocalStorageState;
