import { useMemo, useRef } from 'react';
import useUpdate from '../useUpdate';
import { isPlainObject } from '../utils';

const observer = <T extends Record<string, any> = Record<string, any>>(
  initialVal: T,
  callback: () => void,
) => {
  const proxy: T = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      // https://github.com/alibaba/hooks/issues/1317
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!descriptor?.configurable && !descriptor?.writable) {
        return res;
      }

      // Only proxy plain object or array,
      // otherwise it will cause: https://github.com/alibaba/hooks/issues/2080
      return isPlainObject(res) || Array.isArray(res)
        ? observer(res, callback)
        : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      callback();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      callback();
      return ret;
    },
  });

  return proxy;
};

const useReactive = <S extends Record<string, any>>(initialState: S): S => {
  const update = useUpdate();
  const stateRef = useRef<S>(initialState);

  const state = useMemo(() => {
    return observer(stateRef.current, () => {
      update();
    });
  }, []);

  return state;
};

export default useReactive;
