import { isFunction } from '@/utils';
import { useState } from 'react';

interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T | undefined) => string;
  deserializer?: (value: string | null) => T;
}

const defaultSerializer = (val: any) => JSON.stringify(val);
const defaultDeserializer = (val: string | null) => {
  if (!val) {
    return undefined;
  }
  return JSON.parse(val);
};

const useLocalStorage = <T>(
  key: string,
  options?: Options<T>,
): [T | undefined, (value?: T | ((prev: T) => T)) => void] => {
  const storage = localStorage;
  const {
    defaultValue,
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
  } = options || {};

  const getInitialValue = () => {
    if (defaultValue) {
      return defaultValue;
    }
    return deserializer(storage.getItem(key));
  };

  const [value, setValue] = useState<T>(() => getInitialValue());

  const setStorageValue = (batch?: T | ((prev: T) => T)) => {
    setValue(prevState => {
      const nextState =
        (isFunction(batch) ? batch(prevState) : batch) || ('' as T);
      if (!nextState) {
        storage.setItem(key, '');
      } else {
        storage.setItem(key, serializer(nextState));
      }
      return nextState;
    });
  };

  return [value, setStorageValue];
};

export default useLocalStorage;
