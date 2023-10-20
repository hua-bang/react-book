import { useState } from 'react';
import { isFunction, isUndef } from '../utils';
import useUpdateEffect from '../useUpdateEffect';
import useMemoizedFn from '../useMemoizedFn';

export type GetStorage = () => Storage | undefined;

export interface UseStorageOptions<T = any> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
}

const defaultError = (e: unknown) => {
  console.error(e);
};

const defaultSerializer = <T = any>(value: T): string => {
  return JSON.stringify(value);
};

const defaultDeserializer = <T = any>(jsonStr: string): T => {
  return JSON.parse(jsonStr) as T;
};

export const createUseStorageState = (getStorage: GetStorage) => {
  let storage: ReturnType<GetStorage> = getStorage();

  function useStorage<T = any>(
    key: string,
    options: UseStorageOptions<T> = {},
  ) {
    const {
      serializer = defaultSerializer,
      deserializer = defaultDeserializer,
      onError = defaultError,
    } = options;

    function getStoredValue(): T | undefined {
      try {
        const raw = storage?.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        onError(e);
      }
      if (isFunction(options.defaultValue)) {
        return options.defaultValue();
      }
      return options.defaultValue;
    }

    const [state, setState] = useState<T | undefined>(getStoredValue);

    useUpdateEffect(() => {
      setState(getStoredValue());
    }, [key]);

    const updateState = (value?: T | ((val?: T) => T)) => {
      const currentState = isFunction(value) ? value(state) : value;
      setState(currentState);

      if (isUndef(currentState)) {
        storage?.removeItem(key);
      } else {
        try {
          storage?.setItem(key, serializer(currentState));
        } catch (e) {
          console.error(e);
        }
      }
    };

    return [state, useMemoizedFn(updateState)] as const;
  }

  return useStorage;
};
